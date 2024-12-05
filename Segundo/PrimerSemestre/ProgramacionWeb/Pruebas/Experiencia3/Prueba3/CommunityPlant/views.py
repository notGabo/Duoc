from django.shortcuts import render

def home(request):
    return render(request, 'Experiencia3/index.html')

def index(request):
    return render(request, 'Experiencia3/index.html')

def contactanos(request):
    return render(request, 'Experiencia3/contactanos.html')

def exteriores(request):
    return render(request, 'Experiencia3/PlantasExteriores.html')

def interiores(request):
    return render(request, 'Experiencia3/PlantasInteriores.html')

def arboles(request):
    return render(request, 'Experiencia3/TiposDeArboles.html')

def quienesSomos(request):
    return render(request, 'Experiencia3/quienesSomos.html')

def registrarSolicitud(request):
    return render(request, 'Experiencia3/registrarSolicitud.html')

def tyc(request):
    return render(request, 'Experiencia3/terminosycondiciones.html')

def inicioSesion(request):
    return render(request, 'Experiencia3/inicioSesion.html')
# Create your views here.
