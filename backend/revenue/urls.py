from django.urls import path

from .views import (
    RevenueUploadView,
    DashboardView
)


urlpatterns = [

    path(
        "upload/",
        RevenueUploadView.as_view()
    ),

    path(
        "dashboard/",
        DashboardView.as_view()
    )

]