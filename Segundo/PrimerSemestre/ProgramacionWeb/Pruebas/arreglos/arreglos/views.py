from django.http import HttpResponseRedirect,JsonResponse
from django.shortcuts import render  
from django.forms.models import model_to_dict
from .models import Usuarios

def index(request):
    context = {} 
    context['esta_logueado'] = False
    context['error_login'] = False
    if request.method == 'GET':
        if 'error_login' in request.session:
            if request.session['error_login']:
               context['error_login'] = True 
               request.session['error_login'] = False
        if 'user' in request.session:
            context['esta_logueado'] = True
            context['Usuario'] = request.session['user']
        return render(request, 'Experiencia3MunozGaldamesSotoVenegas/index.html', context)
    elif request.method == 'POST':
        if 'user' in request.session:
            context['esta_logueado'] = True
        data = dict(request.POST)
        if 'registrar-btn' in data:
            username = data['usernameRegistro'][0]
            email = data['emailRegistro'][0]
            password = data['passwordRegistro'][0]
            user = Usuarios(username,email,password)
            user.save()
            print(username, email, password)
        elif 'login-btn' in data:
            username = data['username'][0]
            password = data['password'][0]
            if Usuarios.objects.filter(username = username, password = password).exists():
                with Usuarios.objects.get(username = username) as user:
                    request.session['user'] = model_to_dict(user)
                context['esta_logueado'] = True
                request.session['error_login'] = False
                print('login correcto')
            else:
                request.session['error_login'] = True
                print('login incorrecto')
            print('logueando')
        elif'changepass' in data:
            password = data['contrasenaNueva'][0]
            user = Usuarios.objects.get(mail = request.session['mailChangePassword'])
            user.password = password
            user.save()
            del request.session['mailChangePassword']
        else:
            print('error')            
        return HttpResponseRedirect('/')

def logout(request):
    request.session.flush()
    response = JsonResponse({'success': 'Sesion cerrada'})
    response.status_code = 200
    return response

def contactanos(request):
    return render(request, 'Experiencia3MunozGaldamesSotoVenegas/contactanos.html')

def exteriores(request):
    return render(request, 'Experiencia3MunozGaldamesSotoVenegas/PlantasExteriores.html')

def interiores(request):
    return render(request, 'Experiencia3MunozGaldamesSotoVenegas/PlantasInteriores.html')

def arboles(request):
    return render(request, 'Experiencia3MunozGaldamesSotoVenegas/TiposDeArboles.html')

def quienesSomos(request):
    return render(request, 'Experiencia3MunozGaldamesSotoVenegas/quienesSomos.html')

def registrarSolicitud(request):
    return render(request, 'Experiencia3MunozGaldamesSotoVenegas/registrarSolicitud.html')

def tyc(request):
    return render(request, 'Experiencia3MunozGaldamesSotoVenegas/terminosycondiciones.html')

def inicioSesion(request):
    return render(request, 'Experiencia3MunozGaldamesSotoVenegas/inicioSesion.html')

def resetPassword(request):
    context = {}
    context['esta_registrado'] = True
    context['editar'] = False
    if request.method == 'GET':
        print('test')
    elif request.method == 'POST':
        is_registered = Usuarios.objects.filter(mail = request.POST['email2']).exists()
        request.session['mailChangePassword'] = request.POST['email2']
        context['esta_registrado'] = is_registered
        if is_registered:
            context['editar'] = True
    return render(request, 'Experiencia3MunozGaldamesSotoVenegas/resetPassword.html', context)

def validarEmail(request):
    context = {}
    if request.method == 'GET':
        print('test')
    elif request.method == 'POST':
        is_registered = Usuarios.objects.filter(mail = request.POST['email2']).exists()
        if is_registered:
            con('Email encontrado')
        else:
            print('Email no encontrado')
    return render(request, 'Experiencia3MunozGaldamesSotoVenegas/resetPassword.html', context)

# Create your views here.
