from rest_framework import serializers
from solicitacoes.models import Solicitacoes

class SolicitacoesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solicitacoes
        fields = '__all__'