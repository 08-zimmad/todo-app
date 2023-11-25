from rest_framework import serializers
from .models import Task, CustomUser


class TodoTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ("task_id", 'title', 'description',
                  'due_date', 'is_completed', "user")


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password')

    def create(self, validated_data):

        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user
