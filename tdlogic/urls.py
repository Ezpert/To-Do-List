from django.urls import path

from . import views

urlpatterns =[
    path('list/', views.ToDoList.as_view(), name='list-view'),
    path('list/<int:pk>/', views.ToDoDetail.as_view(), name='list-detail'),



]