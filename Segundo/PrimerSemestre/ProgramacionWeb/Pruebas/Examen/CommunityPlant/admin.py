from django.contrib import admin
from .models import CatalogoPlantas, Usuarios, FormSolicitud, CategoriaPlanta, boleta, Descuento

admin.site.register(Usuarios)
admin.site.register(FormSolicitud)
admin.site.register(CatalogoPlantas)
admin.site.register(CategoriaPlanta)
admin.site.register(boleta)
admin.site.register(Descuento)
# Register your models here.    