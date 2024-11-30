from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self,valited_data):
        password = valited_data.pop('password', None)
        instance = self.Meta.model(**valited_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance