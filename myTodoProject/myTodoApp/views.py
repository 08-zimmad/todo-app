from rest_framework import generics, permissions, status
from .models import CustomUser, Task
from .serializers import CustomUserSerializer, TodoTaskSerializer
from rest_framework.response import Response


class myTodoApp_userCreateView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Customize the response data
            response_data = {
                "message": "User created successfully",
                "status": 201
            }

            return Response(response_data)
        else:
            # If the serializer is not valid, you can customize the error response
            error_response = {
                "message": "User creation failed",
                "errors": serializer.errors,
            }
            return Response(error_response, status=status.HTTP_400_BAD_REQUEST)


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

    def create(self, request, *args, **kwargs):

        response = super().create(request, *args, **kwargs)

        success_data = {
            'status': 201,
            'message': 'Task created successfully.',
            'data': response.data
        }
        response.data = success_data
        response.status_code = status.HTTP_201_CREATED

        return response


class DeleteTodoitem(generics.DestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TodoTaskSerializer
    permission_classes = [permissions.IsAuthenticated]
