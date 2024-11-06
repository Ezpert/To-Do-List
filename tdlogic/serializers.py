from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework import serializers
from tdlogic.models import ToDoModel


class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDoModel
        fields = ['id', 'title', 'description', 'category', 'due_date', 'priority', 'complete']

    def create(self, validated_data):
        if 'due_date' not in validated_data:
            validated_data['due_date'] = timezone.now()
        return super().create(validated_data)


class UserSerializer(serializers.ModelSerializer):
    todo = serializers.PrimaryKeyRelatedField(many=True, queryset=ToDoModel.objects.all())
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = User
        fields = ['id', 'username', 'todo', 'owner']


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
