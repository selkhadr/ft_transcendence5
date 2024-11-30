from django.http import JsonResponse
from .models import ChatMessage

def get_chat_history(request, room_name):
    messages = ChatMessage.objects.filter(room=room_name).order_by('timestamp')
    messages_data = [
        {
            "sender": message.sender.username,
            "content": message.content,
            "timestamp": message.timestamp.isoformat()
        }
        for message in messages
    ]
    return JsonResponse({"room_name": room_name, "messages": messages_data})





# from django.http import JsonResponse
# from .models import ChatMessage

# def get_chat_history(request, room_name):
#     messages = ChatMessage.objects.filter(room=room_name).order_by('timestamp')
#     messages_data = [
#         {
#             "sender": message.sender,
#             "content": message.content,
#             "timestamp": message.timestamp.isoformat()
#         }
#         for message in messages
#     ]
#     return JsonResponse({"room_name": room_name, "messages": messages_data})



# from django.http import JsonResponse
# from .models import ChatMessage
# from django.contrib.auth import get_user_model

# User = get_user_model()

# def get_chat_history(request, room_name):
#     messages = ChatMessage.objects.filter(room=room_name).order_by('timestamp')
#     messages_data = [
#         {
#             "room_name": message.room,
#             "sender": message.user.username,
#             "content": message.content,
#             "timestamp": message.timestamp.isoformat()
#         }
#         for message in messages
#     ]
#     return JsonResponse(messages_data, safe=False)