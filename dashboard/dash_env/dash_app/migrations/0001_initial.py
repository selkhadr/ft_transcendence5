# Generated by Django 4.2.16 on 2024-11-07 17:07

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(default='aa', max_length=200)),
                ('username', models.CharField(max_length=200, unique=True)),
                ('full_name', models.CharField(max_length=200)),
                ('date_cr', models.DateField(default=django.utils.timezone.now)),
                ('total_score', models.IntegerField(default=0)),
                ('profile_picture', models.ImageField(default='images/dino.png', upload_to='images/')),
                ('status', models.CharField(default="Hi, I'm new here", max_length=30)),
                ('user_result', models.IntegerField(default=0)),
            ],
        ),
    ]
