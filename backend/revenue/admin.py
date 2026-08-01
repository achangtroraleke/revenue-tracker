from django.contrib import admin
from .models import RevenueEntry, UploadedFile
# Register your models here.
admin.site.register(RevenueEntry)
admin.site.register(UploadedFile)