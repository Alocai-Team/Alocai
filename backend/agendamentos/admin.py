from django.contrib import admin
from agendamentos.models import Agendamento

@admin.register(Agendamento)
class AgendamentoAdmin(admin.ModelAdmin):
    list_display = ('id_usuario', 'id_sala', 'data_inicio', 'data_fim',
                    'hora_inicio', 'hora_fim', 'descricao', 'status')