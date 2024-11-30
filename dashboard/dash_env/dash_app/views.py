from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.conf import settings
from .models import User
from django import forms
from rest_framework import status
from .serializers import UserSerializer
from django.http import JsonResponse
import json

@api_view(['GET', 'POST'])
def UserListView(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer_class = UserSerializer(users, many=True)
        return(Response(serializer_class.data))
    if request.method == 'POST':
        serializer_class = UserSerializer(data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_201_CREATED)
        return Response(serializer_class.data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_user(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({"error": "User Not Found"}, status=status.HTTP_404_NOT_FOUND)
    user.delete()
    return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

# //////////////////////////////-/-/-/-/-/----->

@api_view(['GET', 'PUT'])
def GetUserData(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return JsonResponse({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
            serializer = UserSerializer(user)
            return JsonResponse(serializer.data, safe=False)

    elif request.method == 'PUT':
        data = json.loads(request.body)
        user.status = request.data.get('status', user.status)
        print (data)
        user.save()
        return JsonResponse({'message': 'Updated!', 'status': user.status})

def check_username(username):
    try:
        User.objects.get(username=username)
    except User.DoesNotExist:
        return username
    raise forms.ValidationError("A user with this username already exists.")

def check_full_name(full_name):
    try:
        User.objects.get(full_name=full_name)
    except User.DoesNotExist:
        return full_name
    raise forms.ValidationError("A user with this name already exists.")

@api_view(['GET', 'PUT'])
def ModifyUserData(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return JsonResponse({'error':'User Not Found'}, status= status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'PUT':

        if 'profile_picture' in request.FILES:
            user.profile_picture = request.FILES['profile_picture']

        if 'full_name' in request.data and request.data['full_name'].strip() != '':
            user.full_name = request.data['full_name']

        if 'username' in request.data and request.data['username'].strip() != '':
            if request.data['username'] != user.username:
                if User.objects.filter(username=request.data['username']).exists():
                    return JsonResponse(data={'error': 'Username already exists'}, status=400)
                else:
                    user.username = request.data['username']

        if 'password' in request.data and request.data['password'].strip() != '':
            user.password = request.data['password']

        user.save()
        return JsonResponse({
            'message': 'updated',
            'profile_picture': user.profile_picture.url if user.profile_picture else None,
            'full_name': user.full_name,
            'username': user.username,
            'password': user.password
        })
