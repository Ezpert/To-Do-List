from django.shortcuts import render
from rest_framework import generics

from tdlogic.models import ToDoModel
from tdlogic.serializers import ToDoSerializer


# Create your views here.
class BaseView:
    def capitalize_category(self, category):
        if category and category[0].islower():
            return category.capitalize()
        return category

class ToDoList(BaseView, generics.ListCreateAPIView):
    serializer_class = ToDoSerializer

    def get_queryset(self):
        queryset = ToDoModel.objects.all()
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
        serializer.save(category=category_new)


class ToDoDetail(BaseView, generics.RetrieveUpdateDestroyAPIView):
    queryset = ToDoModel.objects.all()
    serializer_class = ToDoSerializer

    def perform_update(self, serializer):
        category = serializer.validated_data.get('category', '')
        category_new = self.capitalize_category(category)
        serializer.save(category=category_new)
