from django.urls import path
from . import views

urlpatterns=[
    path('',views.index,name='index'),
    path('votar/', views.votar, name='votar'),
    #path("calcular/", views.calcular_imc, name = "soma"),
]