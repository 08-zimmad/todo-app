# Generated by Django 4.2.5 on 2023-10-15 10:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myTodoApp', '0002_alter_customuser_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='phone_number',
        ),
        migrations.AlterField(
            model_name='customuser',
            name='email',
            field=models.EmailField(max_length=254, unique=True, verbose_name='email address'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]