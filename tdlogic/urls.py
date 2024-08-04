from django.urls import path, include

from . import views

urlpatterns =[
    path('list/', views.ToDoList.as_view(), name='list-view'),
    path('list/<int:pk>/', views.ToDoDetail.as_view(), name='list-detail'),
    path('api-auth/', include('rest_framework.urls')),
    path('register/', views.UserRegistrationView.as_view(), name='user-register'),
    path('users/', views.UserList.as_view(), name='user-list'),
    path('users/<int:pk>', views.UserDetails.as_view(), name='user-details'),



]