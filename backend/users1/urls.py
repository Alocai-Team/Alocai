from django.urls import path
from .views import UserCreateView
from .views import UserLoginView
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import CustomTokenObtainPairView

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
]
