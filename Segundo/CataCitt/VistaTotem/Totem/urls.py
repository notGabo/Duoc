from django.urls import path
from . import views

urlpatterns = [
    path('Index', views.Index, name='Index'),
    path('Pedir_Tranfer/', views.Pedir_Tranfer, name='Pedir_Tranfer'),
    path('seleccion_idioma', views.seleccion_idioma, name='seleccion_idioma'),
    path('Login', views.Login, name='Login'),
    path('Consulta_Transfer', views.Consulta_Transfer, name='Consulta_Transfer'),
]