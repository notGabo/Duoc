# Generated by Django 4.0.4 on 2022-06-04 20:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Usuarios',
            fields=[
                ('username', models.CharField(max_length=30, primary_key=True, serialize=False, verbose_name='Nombre de usuario')),
                ('email1', models.CharField(max_length=60, verbose_name='Correo')),
                ('email2', models.CharField(max_length=60, verbose_name='Confirmacion de correo')),
                ('password1', models.CharField(max_length=60, verbose_name='Contraseña')),
                ('password2', models.CharField(max_length=60, verbose_name='Confirmacion de contraseña')),
            ],
        ),
    ]
