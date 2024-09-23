from django.db import models
from departamentos.models import Departamento
from predios.models import Predio
from salas.models import Sala
from users1.models import User

TURNO_CHOICES = (
    ('manha', 'Manhã'),
    ('tarde', 'Tarde'),
    ('noite', 'Noite'),
)

STATUS_CHOICES = (
    ('Em análise', 'Em análise'),
    ('Aprovado', 'Aprovado'),
    ('Rejeitado', 'Rejeitado'),
)

class Solicitacoes(models.Model):
    id_usuario = models.ForeignKey(User, on_delete=models.PROTECT, related_name='solicitacao')
    universidade = models.CharField(max_length=50, default='UFRPE')
    departamento = models.ForeignKey(Departamento, on_delete=models.PROTECT, related_name='solicitacao')
    predio = models.ForeignKey(Predio, on_delete=models.PROTECT, related_name='solicitacao')
    sala = models.ForeignKey(Sala, on_delete=models.PROTECT, related_name='solicitacao')
    turno = models.CharField(max_length=50, choices=TURNO_CHOICES)
    datahora_inicio = models.DateTimeField()
    datahora_fim = models.DateTimeField()
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default='Em análise')

    def __str__(self):
        return f"{self.status} / {self.sala} / {self.departamento} / {self.universidade}"