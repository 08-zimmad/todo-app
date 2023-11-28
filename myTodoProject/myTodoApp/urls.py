from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # User-related endpoints
    path('api/register/', views.myTodoApp_userCreateView.as_view(),
         name='user-register'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),


    # Todo-related endpoints
    path('api/todos/', views.TodoListView.as_view(), name='todo-list'),
    path('api/todos/<int:pk>/', views.TodoDetailView.as_view(), name='todo-detail'),
    path('api/todos/delete/<int:pk>/',
         views.DeleteTodoitem.as_view(), name='todo-delete'),
    path('api/todos/update/<int:pk>/',
         views.UpdateTodoItem.as_view(), name='todo-update'),
]
