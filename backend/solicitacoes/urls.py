from django.urls import path
from . import views

urlpatterns = [
    path('solicitacoes/', views.SolicitacoesCreateListView.as_view(), name='solicitacoes-create-list'),
    path('solicitacoes/<int:pk>/', views.SolicitacoesRetrieveUpdateDestroyView.as_view(), name='solicitacoes-detail-view')
]