from dataclasses import field, fields
from rest_framework import serializers
from CommunityPlant.models import Descuento, boleta, Usuarios

class DescuentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Descuento
        fields = ['IdCodigo','Porcentaje']

class BoletaSerializer(serializers.ModelSerializer):
    class Meta:
        model = boleta
        fields = ['idBoleta','precioTotal','fecha']

class SuscriptoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['username','suscripcion']

