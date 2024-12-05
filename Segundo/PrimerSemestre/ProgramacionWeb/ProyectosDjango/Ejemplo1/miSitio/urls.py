from cgi import test
from django.urls import path
from .views import home, Test, form_vehiculo, form_mod_vehiculo, form_del_vehiculo
urlpatterns = [
    path('', home,name="home"),
    path('test.html',Test,name="test"),
    path('form_vehiculo.html', form_vehiculo, name='form_vehiculo'),
    path('form_mod_vehiculo.html/<id>', form_mod_vehiculo, name='form_mod_vehiculo'),
    path('form_del_vehiculo/<id>', form_del_vehiculo, name='form_del_vehiculo')
]   