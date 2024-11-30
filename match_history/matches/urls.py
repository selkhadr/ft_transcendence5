from django.urls import path

from . import views

urlpatterns = [
    path('user/<str:username>/',views.getData, name='index'),
    path('add/',views.postData, name='add'),
]