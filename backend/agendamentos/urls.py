from django.urls import path
from . import views

urlpatterns = [
    path('agendamentos/', views.AgendamentoCreateListView.as_view(), name='agendamento-create-list'),
    path('agendamentos/<int:pk>/', views.AgendamentoRetrieveUpdateDestroyView.as_view(), name='agendamento-detail-view')
]