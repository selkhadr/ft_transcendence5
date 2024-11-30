from django.contrib.auth import get_user_model
from django.db import models
from django.shortcuts import render

User = get_user_model()

class ChatMessage(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    room = models.CharField(max_length=255)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.sender.username}: {self.content[:50]}'





# # from django.contrib.auth import get_user_model
# from django.db import models

# # User = get_user_model()

# class ChatMessage(models.Model):
#     sender = models.CharField(max_length=100)
#     room = models.CharField(max_length=255)
#     content = models.TextField()
#     timestamp = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f'{self.sender}: {self.content[:50]}'




# from django.contrib.auth import get_user_model
# from django.db import models

# User = get_user_model()

# class ChatMessage(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     room = models.CharField(max_length=255)
#     content = models.TextField()
#     timestamp = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f'{self.user.username}: {self.content[:50]}'