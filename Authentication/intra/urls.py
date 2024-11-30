
from django.urls import path
from . import views

urlpatterns = [
    path('', views.intralogin, name='home'),
    path('callback/', views.callback, name='callback'),
]