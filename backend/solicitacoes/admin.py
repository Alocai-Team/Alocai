from django.contrib import admin
from solicitacoes.models import Solicitacoes

@admin.register(Solicitacoes)
class SolicitacoesAdmin(admin.ModelAdmin):
    list_display = ('id_usuario', 'universidade', 'departamento', 'predio',
                    'sala', 'turno', 'datahora_inicio', 'datahora_fim', 'status')