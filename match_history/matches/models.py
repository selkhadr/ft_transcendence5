from django.db import models

# Create your models here.
# i will create a model for the match history

class Match(models.Model):
    match_id = models.IntegerField()
    match_type = models.CharField(max_length=100)
    player1 = models.CharField(max_length=100)
    player2 = models.CharField(max_length=100)
    winner = models.CharField(max_length=100)
    score1 = models.IntegerField()
    score2 = models.IntegerField()
    date = models.DateField()


