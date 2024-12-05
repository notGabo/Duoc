from django.urls import path
from rest_CommunityPlant.views import detalle_descuento, lista_descuento, lista_boleta, detalle_boleta, lista_suscritos
urlpatterns = [
    path('lista_descuento/',lista_descuento, name="lista_descuento"),
    path('detalle_descuento/<id>/',detalle_descuento,name="detalle_descuento"),
    path('lista_boleta/',lista_boleta, name="lista_boleta"),
    path('detalle_boleta/<id>/',detalle_boleta,name="detalle_boleta"),
    path('lista_suscritos/',lista_suscritos, name="lista_suscriptores"),
]