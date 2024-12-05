from django.http import HttpResponseRedirect,JsonResponse
from django.shortcuts import render , redirect
from django.forms.models import model_to_dict
from .models import Usuarios, FormSolicitud  
from .forms import RegisterForm 
def index(request):
    context = {} 
    context['mensaje']=''
    context['registro_vacio'] = False
    context['esta_registrado'] = False
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
            if Usuarios.objects.filter(username = user.username).exists():
                context['esta_registrado']=True
                context['mensaje']='El usuario ya existe'
                return render(request, 'Experiencia3MunozGaldamesSotoVenegas/index.html', context)
            elif Usuarios.objects.filter(mail = user.mail).exists():
               context['esta_registrado']=True
               context['mensaje']='El correo ya esta registrado'
               return render(request, 'Experiencia3MunozGaldamesSotoVenegas/index.html', context)
            elif ['',] in data.values():
                print('error elif vacio registrar')
                context['registro_vacio'] = True
                context['mensajeRegistro']='No pueden haber campos vaci­os'
                return render(request, 'Experiencia3MunozGaldamesSotoVenegas/index.html', context)
            else:
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
    HttpResponseRedirect('/')
    return response

def validacionRegistrar(request):
    context = {}
    context['registro_vacio'] = False
    data = dict(request.POST)
    username = data['usernameRegistro']
    email = data['emailRegistro']
    password = data['passwordRegistro']
    user = Usuarios(username,email,password)
    if '' in data.user.values():
        print('FUNCIONO')
        context['mensajeRegistro'] = 'Porfavor, ingresa datos para registrar'
        context['registro_vacio'] = True
    else:
        context['registro_vacio'] = False
    return HttpResponseRedirect('/')
    

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
    datos = {
        'form' : FormSolicitud()
    }
    if request.method == 'POST':
        data = dict(request.POST)
        nombre = data['nombreEntrada'][0]
        mail = data['emailEntrada'][0]
        descripcion = data['descripcionEntrada'][0]
        formulario = FormSolicitud(nombreCompleto = nombre, mailSolicitante = mail, descripcion = descripcion)
        formulario.save()
    return render(request, 'Experiencia3MunozGaldamesSotoVenegas/registrarSolicitud.html', datos)

def tyc(request):
    return render(request, 'Experiencia3MunozGaldamesSotoVenegas/terminosycondiciones.html')

def inicioSesion(request):
    return render(request, 'Experiencia3MunozGaldamesSotoVenegas/inicioSesion.html')

def revisarSolicitudes(request):
    solicitudes = FormSolicitud.objects.all()
    datos = {
        'solicitudes': solicitudes
    }
    return render(request, 'Experiencia3MunozGaldamesSotoVenegas/revisarSolicitudes.html', datos)

def borrarSolicitud(request, id):
    solicitudes=FormSolicitud.objects.get(idSolicitud=id)
    solicitudes.delete()
    return HttpResponseRedirect('/revisarSolicitudes.html')
    #return request(to='revisarSolicitudes.html')
    #return render(request, 'Experiencia3MunozGaldamesSotoVenegas/revisarSolicitudes.html')

def perfil(request):

    contexto = {} 
    contexto['esta_logueado'] = False
    if request.method == 'GET':
        if 'user' in request.session:
            contexto['esta_logueado'] = True
            contexto['Usuario'] = request.session['user']
             
    return render(request, 'Experiencia3MunozGaldamesSotoVenegas/perfil.html',contexto)
    
def borrarperfil(request):

    contexto = {} 
    contexto['esta_logueado'] = False
    data = dict(request.POST)
    print(request.method)
    if request.method == 'POST':
        if 'borroton' in data: 
            print(data)
            username = data['usernames'][0]
            email = data['email'][0]
            password = data['password'][0]
            user = Usuarios(username,email,password)
            if Usuarios(**request.session['user']) == user:
                Usuarios(**request.session['user']).delete()
                request.session.flush()
                print("pase el delete")
                return redirect(to="index")
        else:
            contexto['esta_logueado'] = True
            contexto['Usuario'] = request.session['user']
            print("error")
        
        
    return render(request,'Experiencia3MunozGaldamesSotoVenegas/index.html')

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

def modperfil(request):
    if request.method == 'GET':
        context ={}
        context['form'] = RegisterForm(instance=Usuarios(**request.session['user']))
        user=Usuarios(**request.session['user'])
        context['Usuario']=user
    if request.method == 'POST':
        print(request.POST)
        context ={}
        form = RegisterForm(data=request.POST)
        context['form'] = form
        user = Usuarios(username = request.session['user']['username'], mail = request.POST['mail'], password = request.POST['password'])
        user.save()
        context['Usuario']=user
        request.session['user']=model_to_dict(user)
    return render(request,'Experiencia3MunozGaldamesSotoVenegas/ModPerfil.html',context)
# Create your views here.
