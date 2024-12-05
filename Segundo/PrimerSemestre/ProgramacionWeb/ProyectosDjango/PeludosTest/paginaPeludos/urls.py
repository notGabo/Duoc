from django.urls import path
from cgi import test
from .views import home

urlpatterns = [
    path('', home,name="home"),
]   