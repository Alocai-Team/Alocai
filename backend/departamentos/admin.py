from django.contrib import admin
from departamentos.models import Departamento

@admin.register(Departamento)
class DepartamentoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'universidade', 'area', 'coordenador')