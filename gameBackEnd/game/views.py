from django.shortcuts import render

from django.http import HttpResponse

# Create your views here.



def index(request):
    token = request.COOKIES.get('access')

    return HttpResponse("Hello, world. You're at the polls index.")




# from django.shortcuts import render
# from django.http import HttpResponse
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.views import APIView
# from rest_framework.response import Response

# class SomeProtectedView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         # Your code for this view
#         return Response({"message": "You are authenticated"})
