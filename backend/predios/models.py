from django.db import models
from django.core.validators import RegexValidator
from departamentos.models import Departamento

VALIDACAO_CEP = RegexValidator(
        regex=r'^\d{5}-?\d{3}$',
        message="CEP inválido. O formato deve ser 12345-678 ou 12345678."
    )

class Predio(models.Model):
    nome = models.CharField(max_length=40)
    cep = models.CharField(max_length=9, validators=[VALIDACAO_CEP])
    rua = models.CharField(max_length=40)
    numero = models.CharField(max_length=6, null=True, blank=True)
    departamentos = models.ManyToManyField(Departamento, related_name='predios')

    def __str__(self):
        return self.nome