# Generated by Django 4.2.5 on 2023-11-08 10:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myTodoApp', '0007_alter_task_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='task',
            old_name='user',
            new_name='user_id',
        ),
    ]
