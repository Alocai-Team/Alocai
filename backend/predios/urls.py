from django.urls import path
from . import views

urlpatterns = [
    path('predios/', views.PredioCreateListView.as_view(), name='predio-create-list'),
    path('predios/<int:pk>/', views.PredioRetrieveUpdateDestroyView.as_view(), name='predio-detail-view'),
    path('predios/departamentos/<int:pk>/', views.PrediosPorDepartamentoView.as_view(), name='predios-por-departamento')
]