from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Match
from .serializers import MatchSerializer
from django.db.models import Q

# Create your views here.

@api_view(['GET'])
def getData(request,username):
    print(username)
    
    data = Match.objects.filter(Q(player1=username) | Q(player2=username)).order_by('-id')
    serializer = MatchSerializer(data, many=True)
    return Response(serializer.data)