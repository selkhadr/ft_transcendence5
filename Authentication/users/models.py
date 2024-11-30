from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_intra = models.BooleanField(default=False)
    two_factor_auth = models.BooleanField(default=False)
    two_factor_auth_code = models.CharField(max_length=6, blank=True)

    REQUIRED_FIELDS = []
