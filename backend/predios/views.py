from rest_framework import generics
from predios.models import Predio
from predios.serializers import PredioSerializer

class PredioCreateListView(generics.ListCreateAPIView):
    queryset = Predio.objects.all()
    serializer_class = PredioSerializer

    def get_queryset(self):
        departamento_id = self.kwargs['departamento_id']
        return Predio.objects.filter(departamentos__id=departamento_id)

class PredioRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Predio.objects.all()
    serializer_class = PredioSerializer