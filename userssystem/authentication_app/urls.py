from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views


from .views import Home

urlpatterns = [
    path('login/', Home.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    # path('logout/', views.logout_view, name='logout'),
        path('register/', views.register_view, name='register'),

]