# Generated by Django 4.2.5 on 2023-10-02 13:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myTodoApp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mytodoapp_user',
            name='user_bio',
        ),
        migrations.AddField(
            model_name='task',
            name='user',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]