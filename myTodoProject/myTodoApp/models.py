from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin
# from .manager import CustomUserManager
from django.utils.translation import gettext_lazy as _

# from .manager import CustomUserManager


class CustomUser(AbstractUser, PermissionsMixin):
    email = models.EmailField(_("email address"), unique=True)
    username = models.CharField(max_length=30, unique=True, null=False)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []

    # objects = CustomUserManager()

    def __str__(self):
        return self.username


# Task model
class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200, null=False)
    description = models.TextField(blank=True, null=False)
    created_at = models.DateTimeField(auto_now_add=True, null=False)
    due_date = models.DateTimeField(null=True, blank=True)
    is_completed = models.BooleanField(default=False, null=False)
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title
