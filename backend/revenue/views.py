from django.shortcuts import render

# Create your views here.
import pandas as pd

from django.db.models import Sum
from django.db.models.functions import TruncMonth

from django.utils.timezone import now

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


from .models import RevenueEntry, UploadedFile
from .serializers import (
    UploadSerializer,
    RevenueEntrySerializer
)

from datetime import datetime
from django.db.models import Sum
from django.db.models.functions import TruncMonth

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

        queryset = RevenueEntry.objects.all()


        # --------------------------
        # Month Filter
        # --------------------------

        month_filter = request.GET.get("month")

            # 
        category_chart = list(

            queryset
            .values("category")
            .annotate(
                total=Sum("amount")
            )
            .order_by("-total")

        )


        monthly_chart = list(

            queryset
            .annotate(
                month=TruncMonth("date")
            )
            .values("month")
            .annotate(
                total=Sum("amount")
            )
            .order_by("month")

        )


        if month_filter:

            try:

                selected_date = datetime.strptime(
                    month_filter,
                    "%Y-%m"
                )

                queryset = queryset.filter(
                    date__year=selected_date.year,
                    date__month=selected_date.month
                )

            except ValueError:

                return Response(
                    {
                        "error":
                        "Invalid month format"
                    },
                    status=400
                )



        # --------------------------
        # Category / Client Search
        # --------------------------

        search = request.GET.get("search")


        if search:

            queryset = queryset.filter(

                category__icontains=search

            ) | queryset.filter(

                source_or_client__icontains=search

            )



        # --------------------------
        # Dashboard Metrics
        # --------------------------

        total_revenue = (

            queryset
            .aggregate(
                total=Sum("amount")
            )
            ["total"]
            or 0

        )


        category_breakdown = (

            queryset
            .values("category")
            .annotate(
                total=Sum("amount")
            )
            .order_by("-total")

        )


        return Response({

            "filter_month":
                month_filter,

            "search":
                search,

            "total_revenue":
                total_revenue,

            "transaction_count":
                queryset.count(),

            "category_breakdown":
                category_chart,


            "monthly_revenue_chart":
                monthly_chart,


            "recent_transactions":
                RevenueEntrySerializer(
                    queryset[:10],
                    many=True
                ).data

                })