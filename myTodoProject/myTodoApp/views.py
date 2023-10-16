from rest_framework import generics, permissions
from .models import CustomUser, Task
from .serializers import CustomUserSerializer, TodoTaskSerializer
from .permissions import IsOwnerOrReadOnly


class myTodoApp_userCreateView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]


class TodoListView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TodoTaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TodoDetailView(generics.ListCreateAPIView):
    serializer_class = TodoTaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)
