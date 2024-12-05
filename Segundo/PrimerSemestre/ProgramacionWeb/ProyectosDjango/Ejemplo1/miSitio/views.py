from django.shortcuts import render, redirect
from .models import Vehiculo
from .forms import VehiculoForm
# Create your views here.

def home(request):
    vehiculos = Vehiculo.objects.all()
    datos = {
        'vehiculos': vehiculos
    }
    return render(request, 'miSitio/home.html',datos )

def form_vehiculo(request):
    datos = {
        'form' : VehiculoForm()
    }
    if request.method == 'POST':
        formulario = VehiculoForm(request.POST)
        if formulario.is_valid:
            formulario.save()
            datos['mensaje'] = "Datos guardados correctamente"
    return render(request, 'miSitio/form_vehiculo.html',datos)

def form_mod_vehiculo(request,id):
    vehiculo = Vehiculo.objects.get(patente=id)
    datos = {
        'form': VehiculoForm(instance=vehiculo)
    }
    if request.method == 'POST':
        formulario = VehiculoForm(data=request.POST, instance=vehiculo)
        if formulario.is_valid:
            formulario.save()   
            datos['mensaje'] = "Datos modificados correctamente"
    return render(request,'miSitio/form_mod_vehiculo.html',datos)

def form_del_vehiculo(request, id):
    vehiculo=Vehiculo.objects.get(patente=id)
    vehiculo.delete()
    return redirect(to='home')

class Persona:
    def __init__ (self,nombre,edad):
        self.nombre=nombre
        self.edad=edad
        super().__init__()

def Test(request):
    lista=["Lasaña","Charquican","Porotos Granados"]
    hijo=Persona("Fernando Rivera","4")
    contexto={"nombre":"Claudia Andrea", "comidas":lista, "hijo":hijo}
    return render(request, 'miSitio/test.html', contexto)

