from django.contrib import admin
from salas.models import Sala

@admin.register(Sala)
class SalaAdmin(admin.ModelAdmin):
    list_display = ('numero', 'descricao', 'qtd_cadeiras',
                    'andar', 'id_predio', 'tipo')