from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Match
from .serializers import MatchSerializer
from django.db.models import Q
import requests

# Create your views here.

@api_view(['GET'])
def getData(request,username):
    # print(username)
    token = request.COOKIES.get('access')
    # i have this in docker-compose environment HOST_MACHINE_IP: ${HOST_MACHINE_IP}
    # url = 'http://127.0.0.1:8001/api/user/'
    url = 'http://authentication:8001/api/user/'
    #i whant to include the token in the header as cookie
    cookies = {
        'access': token
    }

    response = requests.get(url, cookies=cookies)


    if response.status_code != 200:
        return Response({'error': 'Invalid token'}, status=400)
    # print(response.json())
    # print(response.json())
    data = Match.objects.filter(Q(player1=username) | Q(player2=username)).order_by('-id')
    serializer = MatchSerializer(data, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def postData(request):
    serializer = MatchSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
