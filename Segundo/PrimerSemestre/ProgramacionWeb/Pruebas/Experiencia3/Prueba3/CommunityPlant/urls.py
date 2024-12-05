from django.urls import path
from .views import *

urlpatterns = [
    path('', home, name="home"),
    path('index.html', home, name="home"),
    path('contactanos.html', contactanos, name='Contactanos'),
    path('PlantasExteriores.html', exteriores, name='Exteriores'),
    path('PlantasInteriores.html', interiores, name='Interiores'),
    path('TiposDeArboles.html', arboles, name='Arboles'),
    path('quienesSomos.html', quienesSomos, name='Quienes Somos'),
    path('registrarSolicitud.html', registrarSolicitud, name='Registrar Solicitud'),
    path('terminosycondiciones.html', tyc, name='Terminos y condiciones'),
    path('inicioSesion.html', inicioSesion, name='Iniciar sesion')
]