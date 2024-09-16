from django.db import models
from salas.models import Sala
from django.contrib.auth.models import User

STATUS_CHOICES = (
    ('Em análise', 'Em análise'),
    ('Aprovado', 'Aprovado'),
    ('Rejeitado', 'Rejeitado'),
)

class Agendamento(models.Model):
    id_usuario = models.ForeignKey(User, on_delete=models.PROTECT, related_name='agendamento')
    id_sala = models.ForeignKey(Sala, on_delete=models.PROTECT, related_name='agendamento')
    data_inicio = models.DateField()
    data_fim = models.DateField()
    hora_inicio = models.TimeField()
    hora_fim = models.TimeField()
    descricao = models.CharField(max_length=200)
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default='Em análise')

    def __str__(self):
        return self.descricao