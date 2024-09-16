from django.db import models

AREAS_GERAIS = (
    ('exatas', 'Ciências Exatas'),
    ('humanas', 'Ciências Humanas'),
    ('biologicas', 'Ciências Biológicas'),
    ('sociais', 'Ciências Sociais Aplicadas'),
    ('artes', 'Artes e Design'),
    ('saude', 'Ciências da Saúde'),
    ('letras', 'Letras'),
    ('agrarias', 'Ciências Agrárias'),
)

UNIVERSIDADE = (
    ('ufrpe', 'UFRPE'),
    ('ufpe', 'UFPE'),
)

class Departamento(models.Model):
    nome = models.CharField(max_length=30)
    universidade = models.CharField(max_length=100, choices=UNIVERSIDADE)
    area = models.CharField(max_length=100, choices=AREAS_GERAIS)
    coordenador = models.CharField(max_length=100)

    def __str__(self):
        return self.nome