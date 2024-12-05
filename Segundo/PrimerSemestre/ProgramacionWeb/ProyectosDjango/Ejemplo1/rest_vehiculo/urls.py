from django.urls import path
from rest_vehiculo.views import lista_vehiculos, detalle_vehiculo

urlpatterns = [
    path('lista_vehiculos',lista_vehiculos,name='lista_vehiculo'),
    path('detalle_vehiculo/<id>',detalle_vehiculo,name='detalle_vehiculo')
]