from django.urls import path
from . import views

urlpatterns = [
    path('salas/', views.SalaCreateListView.as_view(), name='sala-create-list'),
    path('salas/<int:pk>/', views.SalaRetrieveUpdateDestroyView.as_view(), name='sala-detail-view')
]