from rest_framework import generics
from agendamentos.models import Agendamento
from agendamentos.serializers import AgendamentoSerializer

class AgendamentoCreateListView(generics.ListCreateAPIView):
    queryset = Agendamento.objects.all()
    serializer_class = AgendamentoSerializer

class AgendamentoRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Agendamento.objects.all()
    serializer_class = AgendamentoSerializer