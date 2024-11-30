from django.db import models
from django.utils import timezone

# Create your models here.

class User(models.Model):
    password = models.CharField(max_length=200, default="aa")
    username = models.CharField(max_length=200, unique=True)
    full_name = models.CharField(max_length=200)
    date_cr = models.DateField(default=timezone.now().date)
    total_score = models.IntegerField(default=0)
    profile_picture = models.ImageField(upload_to="images/", default="images/dino.png")
    status = models.CharField(max_length=30, default="Hi, I'm new here")
    user_result = models.IntegerField(default=0)
    # email = models.EmailField(default="")

    def __str__(self):
        return self.username + ' ' + self.full_name + ' ' + self.status + ' ' + str(self.date_cr) + ' ' + str(self.user_result)