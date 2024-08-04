from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework import permissions
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from tdlogic.models import ToDoModel
from tdlogic.serializers import ToDoSerializer, UserSerializer, UserRegistrationSerializer
from .permissions import IsOwner


# Create your views here.
class BaseView:
    def capitalize_category(self, category):
        if category and category[0].islower():
            return category.capitalize()
        return category


class ToDoList(BaseView, generics.ListCreateAPIView):
    serializer_class = ToDoSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        user = self.request.user
        queryset = ToDoModel.objects.filter(owner=user)
        complete = self.request.query_params.get('complete', None)
        ordering = self.request.query_params.get('order_by', 'id')
        category = self.request.query_params.get('category', None)
        if category is not None:
            queryset = queryset.filter(category=category)
        if complete is not None:
            queryset = queryset.filter(complete=complete)
        return queryset.order_by(ordering)

    def perform_create(self, serializer):
        category = serializer.validated_data.get('category', '')
        category_new = self.capitalize_category(category)
        serializer.save(category=category_new, owner=self.request.user)


class ToDoDetail(BaseView, generics.RetrieveUpdateDestroyAPIView):
    queryset = ToDoModel.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    serializer_class = ToDoSerializer

    def perform_update(self, serializer):
        category = serializer.validated_data.get('category', '')
        category_new = self.capitalize_category(category)
        serializer.save(category=category_new)


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    serializer_class = UserSerializer



class UserDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    serializer_class = UserSerializer






class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        return Response({"message": "Please use a POST to register a new user"}, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({"message": "User created successfully", "username": serializer.data['username']},
                        status=status.HTTP_201_CREATED, headers=headers)
