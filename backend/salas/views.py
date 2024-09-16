from rest_framework import generics
from salas.models import Sala
from salas.serializers import SalaSerializer

class SalaCreateListView(generics.ListCreateAPIView):
    queryset = Sala.objects.all()
    serializer_class = SalaSerializer

class SalaRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sala.objects.all()
    serializer_class = SalaSerializer