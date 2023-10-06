from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .models import myTodoApp_user, Task
from .serializers import CustomUserSerializer, TodoTaskSerializer
from .permissions import IsOwnerOrReadOnly

class myTodoApp_userCreateView(generics.CreateAPIView):
    queryset = myTodoApp_user.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]

class TodoListView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TodoTaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TodoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TodoTaskSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

# class CustomTokenObtainPairView(TokenObtainPairView):
#     pass

# class CustomTokenRefreshView(TokenRefreshView):
#     pass
