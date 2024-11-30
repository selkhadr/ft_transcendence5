from django.shortcuts import redirect
from django.http import HttpResponse, JsonResponse
import requests
import environ
from users.models import User
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

# Initialize environment variables
env = environ.Env()
environ.Env.read_env()

def intralogin(request):
    client_id = env.str('UID')
    redirect_url = f"https://api.intra.42.fr/oauth/authorize?client_id={client_id}&redirect_uri=http%3A%2F%2F127.0.0.1%3A8001%2Fcallback%2F&response_type=code"
    return redirect(redirect_url)

def callback(request):
    code = request.GET.get('code')
    if not code:
        return HttpResponse('Authorization code not found', status=400)

    token_url = 'https://api.intra.42.fr/oauth/token'
    data = {
        'grant_type': 'authorization_code',
        'client_id': env.str('UID'),
        'client_secret': env.str('SECRET'),
        'code': code,
        'redirect_uri': "http://127.0.0.1:8001/callback/",
    }

    response = requests.post(token_url, data=data)
    if response.status_code != 200:
        return HttpResponse('Error fetching access token', status=response.status_code)
    
    token_data = response.json()
    access_token = token_data.get('access_token')
    if not access_token:
        return HttpResponse('Access token not found', status=400)

    user_data = get_user_profile(access_token)
    login = user_data.get('login')
    email = user_data.get('email')
    print(login, email)

    user, created = User.objects.get_or_create(username=login, defaults={'email': email, 'is_active': False, 'is_intra': True})
    if not created:
        user.is_intra = True
        user.save()

    refresh = RefreshToken.for_user(user)
    response = Response()



    response.data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'username': str(login)
        }
    response = redirect('http://127.0.0.1:5501/#home?')
    response.set_cookie(key='refresh', value=str(refresh), httponly=True, samesite=None)
    response.set_cookie(key='access', value=str(refresh.access_token), httponly=True, samesite=None)
    response.set_cookie(key='username', value=str(login), httponly=True, samesite=None)

    url = 'http://dashboard:8004/api/users/'
    datax = {
        'username': login,
        'full_name': login
    }
    responsex = requests.post(url, data=datax)
    print(responsex.json())
    return response

def get_user_profile(access_token):
    url = 'https://api.intra.42.fr/v2/me'
    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    response = requests.get(url, headers=headers)
    return response.json()
