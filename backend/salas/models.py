from django.db import models
from predios.models import Predio

TIPOS_SALA = (
    ('sala', 'Sala'),
    ('desenho', 'Sala de Desenho'),
    ('lab', 'Laboratório'),
    ('auditorio', 'Auditório'),
)

class Sala(models.Model):
    numero = models.IntegerField()
    descricao = models.CharField(max_length=300)
    qtd_cadeiras = models.IntegerField()
    andar = models.IntegerField()
    id_predio = models.ForeignKey(Predio, on_delete=models.PROTECT, related_name='sala')
    tipo = models.CharField(max_length=100, choices=TIPOS_SALA)

    def __str__(self):
        return f"{self.id_predio.nome} / {self.andar} / {self.numero} / {self.tipo}"