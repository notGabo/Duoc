from django.db import models

# Create your models here.

class Usuarios(models.Model):
    username = models.CharField(max_length=30,primary_key=True, verbose_name='Nombre de usuario')
    email1 = models.CharField(max_length=60, null=False, blank=False, verbose_name='Correo')
    email2 = models.CharField(max_length=60, null=False, blank=False,  verbose_name='Confirmacion de correo')
    password1 = models.CharField(max_length=60, null=False, blank=False, verbose_name='Contraseña')
    password2 = models.CharField(max_length=60, null=False, blank=False, verbose_name='Confirmacion de contraseña')

def __str__(self):
    return self.username