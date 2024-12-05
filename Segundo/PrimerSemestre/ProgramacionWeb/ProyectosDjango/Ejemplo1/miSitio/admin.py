from django.contrib import admin
from .models import Categoria, Vehiculo

# Register your models here.
# Permite mostrar el modelo completo

admin.site.register(Categoria)
admin.site.register(Vehiculo)   