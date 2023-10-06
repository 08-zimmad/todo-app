from django.contrib import admin
from .models import Task, myTodoApp_user

# Register your models here.
admin.site.register(Task)
admin.site.register(myTodoApp_user)