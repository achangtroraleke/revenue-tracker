from rest_framework import serializers
from .models import RevenueEntry, UploadedFile


class RevenueEntrySerializer(serializers.ModelSerializer):

    class Meta:
        model = RevenueEntry
        fields = [
            "id",
            "date",
            "category",
            "source_or_client",
            "amount",
            "created_at"
        ]


class UploadSerializer(serializers.Serializer):

    file = serializers.FileField()

    def validate_file(self, value):

        if not value.name.endswith(
            (".xlsx", ".xls")
        ):
            raise serializers.ValidationError(
                "Only Excel files are supported."
            )

        return value