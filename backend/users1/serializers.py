from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=6)
    re_password = serializers.CharField(write_only=True, required=True, min_length=6)

    class Meta:
        model = User
        fields = ['name', 'email', 'password', 're_password']

    def validate(self, attrs):
        if attrs['password'] != attrs['re_password']:
            raise serializers.ValidationError({"password": "As senhas não coincidem."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('re_password')
        user = User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password']
        )
        return user



class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(email=email, password=password)
        if user is None:
            raise serializers.ValidationError("Credenciais inválidas.")

        attrs['user'] = user
        return attrs

    def get_tokens(self, user):
        refresh = RefreshToken.for_user(user)
        
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
