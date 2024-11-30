
from django.urls import path,include
from .views import RegisterViews
from .views import LoginViews
from .views import UserViews
from .views import LogoutViews
from .views import email_send
from .views import email_activate

urlpatterns = [
    path('register/',RegisterViews.as_view()),
    path('login/',LoginViews.as_view()),
    path('user/',UserViews.as_view()),
    path('logout/',LogoutViews.as_view()),
    path('email/', email_send, name='email'),
    path('email/activate/<str:code>/', email_activate, name='email'),

]
