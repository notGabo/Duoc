from django.urls import path 
from .views import *


urlpatterns = [
    path('', index, name='index'),
    path('contactanos.html', contactanos, name='Contactanos'),
    path('PlantasExteriores.html', exteriores, name='Exteriores'),
    path('PlantasInteriores.html', interiores, name='Interiores'),
    path('TiposDeArboles.html', arboles, name='Arboles'),
    path('quienesSomos.html', quienesSomos, name='Quienes Somos'),
    path('registrarSolicitud.html', registrarSolicitud, name='Registrar Solicitud'),
    path('terminosycondiciones.html', tyc, name='Terminos y condiciones'),
    path("revisarSolicitudes.html", revisarSolicitudes, name="Revisar Solicitudes"),
    path('borrarsolicitud/<id>',borrarSolicitud, name="Borrar Solicitud"),
    path('api/v1/logout',logout,name='logout'),
    path('Perfil.html', perfil, name='Perfil'),
    path('BorrarPerfil/', borrarperfil, name='BorrarPerfil'),
    path('ModPerfil.html', modperfil, name="Modificar Perfil"),
    path('resetPassword.html',resetPassword, name="resetear contraseña"),
    path('catalogo.html', catalogo, name="Catalogo"),
    path('limpiarCarroto/',limpiarCarroto, name='Limpiar carroto'),
    path('boleta/',boleton, name='boleta'),
    path('suscribirse/',suscripcion, name='suscripcion'),
    path('seguimiento.html',seguimiento, name='seguimiento'),
    path('descSub/<total>/',descSub, name='descSub'),
    path('listaSuscriptores.html',listaSuscriptores, name='Lista Suscriptores'),
]