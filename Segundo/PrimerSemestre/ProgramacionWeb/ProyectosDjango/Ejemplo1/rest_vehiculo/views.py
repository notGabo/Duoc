from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from miSitio.models import Vehiculo
from .serializers import VehiculoSerializer


@csrf_exempt
@api_view(['GET','POST'])
# Create your views here.
def lista_vehiculos(request):
    """
    Lista todos los vehiculos
    """
    if request.method == 'GET':
        vehiculo = Vehiculo.objects.all()
        serializer = VehiculoSerializer(vehiculo , many = True)
        return Response(serializer.data)
    elif request.method == 'POST':
        #data = JSONParser().parse(request)
        serializer = VehiculoSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status = status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
def detalle_vehiculo(request,id):
    """
    Get, update o delete de un vehiculo en particular
    """
    try:
        vehiculo = Vehiculo.objects.get(patente = id)
    except Vehiculo.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = VehiculoSerializer(vehiculo)
        return Response(serializer.data)
    if request.method == 'PUT':
        #data = JSONParser().parse(request)
        serializer = VehiculoSerializer(vehiculo, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else: 
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    if request.method == 'DELETE':
        vehiculo.delete()
        return Response (status = status.HTTP_204_NO_CONTENT)
