from datetime import datetime

import pandas as pd

from django.db.models import Q, Sum
from django.db.models.functions import TruncMonth

from rest_framework.response import Response
from rest_framework.views import APIView

from .models import RevenueEntry, UploadedFile
from .serializers import (
    RevenueEntrySerializer,
    UploadSerializer,
)

class RevenueUploadView(APIView):

    def post(self, request):

        serializer = UploadSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        excel_file = serializer.validated_data[
            "file"
        ]

        # Prevent duplicate uploads

        if UploadedFile.objects.filter(
            filename=excel_file.name
        ).exists():

            return Response(
                {
                    "error":
                    "This file was already uploaded."
                },
                status=400
            )


        try:

            df = pd.read_excel(
                excel_file
            )


            required_columns = [
                "Date",
                "Category",
                "Client",
                "Amount"
            ]


            if not all(
                col in df.columns
                for col in required_columns
            ):

                return Response(
                    {
                        "error":
                        "Invalid Excel format."
                    },
                    status=400
                )


            revenue_entries = []


            for _, row in df.iterrows():

                if pd.isna(row["Amount"]):
                    continue


                revenue_entries.append(
                    RevenueEntry(
                        date=row["Date"],
                        category=row["Category"],
                        source_or_client=row["Client"],
                        amount=row["Amount"]
                    )
                )


            RevenueEntry.objects.bulk_create(
                revenue_entries
            )


            UploadedFile.objects.create(
                filename=excel_file.name
            )


            return Response(
                {
                    "message":
                    f"{len(revenue_entries)} records uploaded."
                }
            )


        except Exception as e:

            return Response(
                {
                    "error": str(e)
                },
                status=500
            )




class DashboardView(APIView):
    def get(self, request):
        # Unfiltered data
        base_queryset = RevenueEntry.objects.all()

        # Separate queryset used only for the doughnut chart and table
        filtered_queryset = base_queryset

        month_filter = request.GET.get("month", "").strip()
        search = request.GET.get("search", "").strip()

        # Apply month only to filtered data
        if month_filter:
            try:
                selected_month = datetime.strptime(
                    month_filter,
                    "%Y-%m",
                )
            except ValueError:
                return Response(
                    {
                        "error": (
                            "Invalid month format. "
                            "Use YYYY-MM."
                        )
                    },
                    status=400,
                )

            filtered_queryset = filtered_queryset.filter(
                date__year=selected_month.year,
                date__month=selected_month.month,
            )

        # Apply category/client search only to filtered data
        if search:
            filtered_queryset = filtered_queryset.filter(
                Q(category__icontains=search)
                | Q(source_or_client__icontains=search)
            )

        # ------------------------------------
        # Unfiltered summary-card information
        # ------------------------------------

        total_revenue = (
            base_queryset.aggregate(
                total=Sum("amount")
            )["total"]
            or 0
        )

        current_date = datetime.now()

        monthly_revenue = (
            base_queryset.filter(
                date__year=current_date.year,
                date__month=current_date.month,
            ).aggregate(
                total=Sum("amount")
            )["total"]
            or 0
        )

        transaction_count = base_queryset.count()

        # ------------------------------------
        # Unfiltered monthly line chart
        # ------------------------------------

        monthly_revenue_chart = list(
            base_queryset
            .annotate(month=TruncMonth("date"))
            .values("month")
            .annotate(total=Sum("amount"))
            .order_by("month")
        )

        # ------------------------------------
        # Filtered doughnut chart
        # ------------------------------------

        category_breakdown = list(
            filtered_queryset
            .values("category")
            .annotate(total=Sum("amount"))
            .order_by("-total")
        )

        # ------------------------------------
        # Filtered transaction table
        # ------------------------------------

        recent_transactions = (
            filtered_queryset
            .order_by("-date", "-created_at")[:10]
        )

        return Response(
            {
                "filters": {
                    "month": month_filter,
                    "search": search,
                },

                # Unfiltered summary cards
                "total_revenue": total_revenue,
                "monthly_revenue": monthly_revenue,
                "transaction_count": transaction_count,

                # Filtered doughnut chart
                "category_breakdown": category_breakdown,

                # Unfiltered monthly line chart
                "monthly_revenue_chart": monthly_revenue_chart,

                # Filtered table
                "recent_transactions": (
                    RevenueEntrySerializer(
                        recent_transactions,
                        many=True,
                    ).data
                ),

                # Optional filtered count for display
                "filtered_transaction_count": (
                    filtered_queryset.count()
                ),
            }
        )