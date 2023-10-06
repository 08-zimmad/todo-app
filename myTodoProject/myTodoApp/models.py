from django.db import models
from django.contrib.auth.models import User,AbstractUser, PermissionsMixin
from .manager import UserManager



class myTodoApp_user(AbstractUser,PermissionsMixin):
    username=models.CharField(unique=True, max_length=50)
    email=models.EmailField(unique=True)
    password=models.CharField(max_length=40)



    USERNAME_FIELD='username'
    REQUIRED_FIELD=[]


    objects = UserManager()


# Task model
class Task(models.Model):
    task_id=models.AutoField(primary_key=True, null=False)
    title = models.CharField(max_length=200,null=False)
    description = models.TextField(blank=True,null=False)
    created_at = models.DateTimeField(auto_now_add=True,null=False)
    due_date = models.DateTimeField(null=True, blank=True)
    is_completed = models.BooleanField(default=False,null=False)
    user = models.ForeignKey(myTodoApp_user, on_delete=models.CASCADE)

    def __str__(self):
        return self.title






