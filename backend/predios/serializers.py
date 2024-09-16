from rest_framework import serializers
from predios.models import Predio

class PredioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Predio
        fields = '__all__'