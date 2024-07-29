from django.utils import timezone
from rest_framework import serializers
from tdlogic.models import ToDoModel


class ToDoSerializer(serializers.ModelSerializer):


    class Meta:
        model = ToDoModel
        fields = ['id', 'title', 'description', 'category', 'due_date', 'complete']

    def create(self, validated_data):
        if 'due_date' not in validated_data:
            validated_data['due_date'] = timezone.now()
        return super().create(validated_data)