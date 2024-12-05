from django.shortcuts import render
from .models import Empresa,Auto

# Create your views here.

def Index(request):
    context={}
    return render(request,'Index.html',context)

def seleccion_idioma(request):
    context={}
    return render(request,'seleccion_idioma.html',context)

def Login(request):
    context={}
    return render(request,'Login.html',context)

def Consulta_Transfer(request):
    empresas = Empresa.objects.all()
    context = {'empresas': empresas}
    return render(request, 'Consulta_Transfer.html', context)

def Pedir_Tranfer(request):
    # Obtener todas las empresas
    empresas = Empresa.objects.all()

    # Configurar los autos para cada empresa utilizando set()
    for empresa in empresas:
        autos_empresa = Auto.objects.filter(empresa=empresa)
        empresa.autos.set(autos_empresa)
    print(empresas)
    # Renderizar la plantilla con los datos obtenidos
    return render(request, 'Pedir_Tranfer.html', {'empresas': empresas})


