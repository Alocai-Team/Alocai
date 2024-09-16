from rest_framework import generics
from departamentos.models import Departamento
from departamentos.serializers import DepartamentoSerializer

class DepartamentoCreateListView(generics.ListCreateAPIView):
    queryset = Departamento.objects.all()
    serializer_class = DepartamentoSerializer

class DepartamentoRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Departamento.objects.all()
    serializer_class = DepartamentoSerializer