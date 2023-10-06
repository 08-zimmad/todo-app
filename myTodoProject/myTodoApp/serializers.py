from rest_framework import serializers
from .models import Task,myTodoApp_user


class TodoTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model=Task
        fields=('title','description', 'due_date','is_completed')    



class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = myTodoApp_user
        fields = ('username', 'email', 'password','is_active', 'is_staff', 'date_joined')
        read_only_fields = ('is_active', 'is_staff', 'date_joined')


