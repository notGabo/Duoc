from django.db import models
from django import forms
from distutils.command.upload import upload

# Create your models here.

class Empresa(models.Model):
    idEmpresa = models.IntegerField(primary_key=True,verbose_name='idEmpresa')
    rut = models.IntegerField(verbose_name='rut')
    nombreEmpresa = models.CharField(max_length=100,verbose_name='nombreEmpresa')
    logo = models.ImageField(upload_to="imagenes", null=True, verbose_name='Imagen')
    sucursal = models.CharField(max_length=100,verbose_name='sucursal')

    def __str__(self):
        return str(self.idEmpresa)


class Auto(models.Model):
    idAuto= models.IntegerField(primary_key=True,verbose_name='idAuto')
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, related_name='autos')
    nombre = models.CharField(max_length=50,verbose_name='nombreAuto')
    foto = models.ImageField(upload_to='static/Imagenes/')
    marca = models.CharField(max_length=50,verbose_name='marca')
    modelo= models.CharField(max_length=50,verbose_name='modelo')
    cantidadAsientos= models.IntegerField(verbose_name='cantidadAsientos')
    anno =models.IntegerField(verbose_name='anno')
    color = models.CharField(max_length=50,verbose_name='color')
    disponibilidad= models.CharField(max_length=2,verbose_name='disponibilidad')


    def __str__(self):
        return str(self.idAuto)

class SeleccionAutoForm(forms.Form):
    empresa = forms.ModelChoiceField(queryset=Empresa.objects.all(), empty_label='Seleccione una empresa')