# Generated by Django 4.2.5 on 2023-10-21 08:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myTodoApp', '0005_customuser_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='username',
            field=models.CharField(max_length=30, unique=True),
        ),
    ]
