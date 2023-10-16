from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager
from .manager import CustomUserManager


from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from .manager import CustomUserManager


class CustomUser(AbstractUser, PermissionsMixin):
    username = None
    email = models.EmailField(_("email address"), unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


# Task model
class Task(models.Model):
    task_id = models.AutoField(primary_key=True, null=False)
    title = models.CharField(max_length=200, null=False)
    description = models.TextField(blank=True, null=False)
    created_at = models.DateTimeField(auto_now_add=True, null=False)
    due_date = models.DateTimeField(null=True, blank=True)
    is_completed = models.BooleanField(default=False, null=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
