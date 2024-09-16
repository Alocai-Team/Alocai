from django.urls import path
from . import views

urlpatterns = [
    path('departamentos/', views.DepartamentoCreateListView.as_view(), name='departamento-create-list'),
    path('departamentos/<int:pk>/', views.DepartamentoRetrieveUpdateDestroyView.as_view(), name='departamento-detail-view')
]