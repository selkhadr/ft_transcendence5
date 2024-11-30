from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import User
import jwt
import datetime
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.state import token_backend


from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_decode



from django.core.mail import send_mail
from rest_framework.decorators import api_view
from django.http import HttpRequest
import random
import requests

def generate_verification_code():
    return str(random.randint(100000, 999999))

def email_send(email, virefication_code, username):
    send_mail(
        subject='Hello My Lol from ',
        message='the virefication_code is : ' + str(virefication_code) + ' for the user ' + str(username),
        from_email='eloualy73@gmail.com',  # From email
        recipient_list=[email],  # To email
        fail_silently=False,
    )
@api_view(['GET', 'POST'])
def email_activate(request, code):
    the_code = code
    the_email = urlsafe_base64_decode(code).decode('utf-8')
    print("The decoded string is > " + the_email)
    user = User.objects.filter(email=the_email).first()
    if user is not None:
        user.is_active = True
        user.save()
    response_data = {'message': 'Email activated successfully'}
    return Response(response_data)
    
class RegisterViews(APIView):
    def post(self,request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # email_send(request._request, email=request.data['email'])
        return Response(serializer.data)



class LoginViews(APIView):
    def post(self,request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()
        is_active = User.objects.filter(email=email).values('is_active')[0]['is_active']
        if user is None:
            raise AuthenticationFailed('User not found')
        username = user.username
        print(username)
        if not user.is_active==True:
            raise AuthenticationFailed('User not active')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')
        
        # create user info by sending post request to the user service including {"username": "selkhadr","full_name": "selkhadr el-selkhadr"}
        url = 'http://dashboard:8004/api/users/'
        data = {
            'username': username,
            'full_name': username
        }
        response = requests.post(url, data=data)
        print(response.json())


        if user.two_factor_auth == False:
            virefication_code = generate_verification_code()
            user.two_factor_auth_code = virefication_code
            user.save()
            email_send(user.email, virefication_code, user.username)
        

        refresh = RefreshToken.for_user(user)
        
        response = Response()

        response.set_cookie(key='refresh', value=str(refresh), httponly=False)
        response.set_cookie(key='access', value=str(refresh.access_token), httponly=False)
        response.set_cookie(key='username', value=str(username), httponly=False)

        response.data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'username': str(username)
        }
        return response


class UserViews(APIView):
    def get(self,request):
        token = request.COOKIES.get('access')

        print(request.COOKIES)
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        
        try:
            UntypedToken(token)
        except (InvalidToken, TokenError) as e:
            raise AuthenticationFailed('Unauthenticated')

        id = token_backend.decode(token)['user_id']
        user = User.objects.filter(id=id).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)

class LogoutViews(APIView):
    def post(self,request):
        response = Response()
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        response.data = {
            'message':'success'
        }
        return response
    


