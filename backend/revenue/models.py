from django.db import models


class RevenueEntry(models.Model):
    date = models.DateField()
    category = models.CharField(max_length=100)
    source_or_client = models.CharField(max_length=255)
    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date"]

    def __str__(self):
        return f"{self.category} - {self.amount}"

class UploadedFile(models.Model):
    filename = models.CharField(
        max_length=255,
        unique=True
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.filename