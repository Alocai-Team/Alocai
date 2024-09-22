from rest_framework import generics
from solicitacoes.models import Solicitacoes
from solicitacoes.serializers import SolicitacoesSerializer

class SolicitacoesCreateListView(generics.ListCreateAPIView):
    queryset = Solicitacoes.objects.all()
    serializer_class = SolicitacoesSerializer

class SolicitacoesRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Solicitacoes.objects.all()
    serializer_class = SolicitacoesSerializer