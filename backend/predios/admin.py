from django.contrib import admin
from predios.models import Predio

@admin.register(Predio)
class PredioAdmin(admin.ModelAdmin):
    list_display = ('nome', 'cep','rua', 'numero')