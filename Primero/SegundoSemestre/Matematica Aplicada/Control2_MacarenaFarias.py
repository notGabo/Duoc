import os

rutAdmin="13467938-k"

#Trabajador 1
rutTrabajadorUno="12345678-9"
sueldoBaseUno=168500
gratificacionUno=8425
cargoUno="Vendedor"

#Trabajador 2
rutTrabajadorDos="9876432-k"
sueldoBaseDos=674000
colacionDos=3500
MovilizacionUno=1200
cargoDos="Supervisor"

#Trabajador 3
rutTrabajadorTres="15975364-0"
sueldoBaseTres=421250
gratificacionTres=0
cargoTres="Responsable de caja"

#Variables comunes entre trabajadores
colacion=3500
Movilizacion=1200

def menu():
	print('******* "Calculo de remuneraciones" ******')
	print("1. Calcular")
	print("2. Salir")

def datosTrabajador():
    while(True):
        rutConsulta=str.lower(input("Ingrese el rut a consultar: "))
        if(rutConsulta == rutTrabajadorUno):
            #Gratificaciones Uno
            while(True):
                try:
                    ventasMensuales=int(input("Ingrese la cantidad de ventas mensuales. No debe ser mayor de 30 ni menor que 0: "))
                    if(ventasMensuales > 30):
                        print("Ingreso un valor mayor que 30. Vuelva a intentarlo")
                    if(ventasMensuales < 0):
                        print("Ingreso un valor menor que 0. Vuelva a intentarlo")
                    if(0<ventasMensuales<30):
                        gratificacionUnoTotal=gratificacionUno*ventasMensuales
                        break
                except ValueError:
                    print("Error. Debe ingresar un numero entero. Vuelva a intentarlo")
            #Colacion y movilizacion uno
            while(True):
                try:
                    diasTrabajados=int(input("Ingrese la cantidad de dias Trabajados. No debe ser menor que 0: "))
                    if(diasTrabajados < 0):
                        print("Ingreso un valor menor que 0. Vuelva a intentarlo")
                    if(0<diasTrabajados):
                        colacionUnoTotal=3500*diasTrabajados
                        movilizacionUnoTotal=1200*diasTrabajados
                        break
                except ValueError:
                    print("Error. Debe ingresar un numero entero. Vuelva a intentarlo")
                    os.system("pause")

            #Variables para calcular
            haberesImponiblesUno=sueldoBaseUno+gratificacionUnoTotal
            haberesNoImponiblesUno=colacionUnoTotal+movilizacionUnoTotal
            descuentosTotalesUno=round((sueldoBaseUno*0.07)+(sueldoBaseUno*0.115))
            sueldoLiquidoUno= haberesImponiblesUno+haberesNoImponiblesUno-descuentosTotalesUno
            #Mostrar info recogida
            while(True):
                SoN=str.upper(input("¿Desea mostrar en pantalla la informacion tomada? S/N: "))
                if(SoN == "S"):
                    os.system("cls")
                    print("Trabajador: Alan Brito Delgado")
                    print("RUT:",rutTrabajadorUno)
                    print("Total haberes imponibles: $", haberesImponiblesUno)
                    print("Total haberes no imponibles: $", haberesNoImponiblesUno)
                    print("Descuentos totales: $", descuentosTotalesUno)
                    print("Sueldo liquido a pagar: $",sueldoLiquidoUno)
                    os.system("pause")
                    break
                if(SoN == "N"):
                    os.system("pause")
                    os.system("cls")
                    break
                else:
                    print("Ingrese una opcion correcta entre S o N")
        if(rutConsulta == rutTrabajadorDos):
            #Gratificaciones Dos
            while(True):
                try:
                    ventasMensuales=int(input("Ingrese la cantidad de ventas mensuales."))
                    if(ventasMensuales > 30):
                        gratificacionDosTotal=sueldoBaseDos*1.1
                        break
                    if(ventasMensuales < 0):
                        print("Ingreso un valor menor que 0. Vuelva a intentarlo")
                    if(0<ventasMensuales<30):
                        break
                except ValueError:
                    print("Error. Debe ingresar un numero entero. Vuelva a intentarlo")
            #Colacion y movilizacion dos
            while(True):
                try:
                    diasTrabajados=int(input("Ingrese la cantidad de dias Trabajados. No debe ser menor que 0: "))
                    if(diasTrabajados < 0):
                        print("Ingreso un valor menor que 0. Vuelva a intentarlo")
                    if(0<diasTrabajados):
                        break
                except ValueError:
                    print("Error. Debe ingresar un numero entero. Vuelva a intentarlo")
            colacionDosTotal=3500*diasTrabajados
            movilizacionDosTotal=1200*diasTrabajados

            #Variables para calcular
            haberesImponiblesDos=sueldoBaseDos+gratificacionDosTotal
            haberesNoImponiblesDos=colacionDosTotal+movilizacionDosTotal
            descuentosTotalesDos=round((sueldoBaseDos*0.07)+(sueldoBaseDos*0.115))
            sueldoLiquidoDos= haberesImponiblesDos+haberesNoImponiblesDos-descuentosTotalesDos

            #Mostrar info recogida
            while(True):
                SoN=str.upper(input("¿Desea mostrar en pantalla la informacion tomada? S/N: "))
                if(SoN == "S"):
                    os.system("cls")
                    print("Trabajador: Marcia Ana Rojas")
                    print("RUT:",rutTrabajadorDos)
                    print("Total haberes imponibles: $", haberesImponiblesDos)
                    print("Total haberes no imponibles: $", haberesNoImponiblesDos)
                    print("Descuentos totales: $", descuentosTotalesDos)
                    print("Sueldo liquido a pagar: $",sueldoLiquidoDos)
                    os.system("pause")
                    break
                if(SoN == "N"):
                    os.system("pause")
                    os.system("cls")
                    break
                else:
                    print("Ingrese una opcion correcta entre S o N")                   
        if(rutConsulta == rutTrabajadorTres):
            #Gratificaciones Tres
            gratificacionTresTotal=0            
            #Colacion y movilizacion dos
            while(True):
                try:
                    diasTrabajados=int(input("Ingrese la cantidad de dias Trabajados. No debe ser menor que 0: "))
                    if(diasTrabajados < 0):
                        print("Ingreso un valor menor que 0. Vuelva a intentarlo")
                    if(0<diasTrabajados):
                        break
                except ValueError:
                    print("Error. Debe ingresar un numero entero. Vuelva a intentarlo")
            colacionTresTotal=3500*diasTrabajados
            movilizacionTresTotal=1200*diasTrabajados
            
            #Variables para calcular
            haberesImponiblesTres=sueldoBaseTres+gratificacionTresTotal
            haberesNoImponiblesTres=colacionTresTotal+movilizacionTresTotal
            descuentosTotalesTres=round((sueldoBaseTres*0.07)+(sueldoBaseTres*0.115))
            sueldoLiquidoTres= haberesImponiblesTres+haberesNoImponiblesTres-descuentosTotalesTres
            #Mostrar info recogida
            while(True):
                SoN=str.upper(input("¿Desea mostrar en pantalla la informacion tomada? S/N: "))
                if(SoN == "S"):
                    os.system("cls")
                    print("Trabajador: Armando Puentes del Campo") 
                    print("RUT:",rutTrabajadorTres)
                    print("Total haberes imponibles: $", haberesImponiblesTres)
                    print("Total haberes no imponibles: $", haberesNoImponiblesTres)
                    print("Descuentos totales: $", descuentosTotalesTres)
                    print("Sueldo liquido a pagar: $",sueldoLiquidoTres)
                    os.system("pause")
                    break
                if(SoN == "N"):
                    os.system("pause")
                    os.system("cls")
                    break
                else:
                    print("Ingrese una opcion correcta entre S o N")              
        if(rutConsulta == "volver"):
            break   
        else:
            print("El rut ingresado no coincide con ninguno de los trabajadores. Vuelva a intentarlo o escriba 'volver'")

def Salir():
	print("╔════════════════════════════════════════════╗")
	print("║           Se cerrara el programa           ║")
	print("╚════════════════════════════════════════════╝")
                
#Programa principal
while(True):
    os.system("cls")
    #ciclo de apoyo para inicio de sesion--------------------------------------------------------------------------
    while(True):
        rutIngreso=str.lower(input("Ingrese el rut sin puntos y con guion. Escriba 'salir' para cerrar el programa: "))
        if(rutIngreso == rutAdmin):
            print("Bienvenido administrador")
            break
        if(rutIngreso == rutTrabajadorUno):
            print("Rut ingresado no tiene permisos suficientes.")
        if(rutIngreso == rutTrabajadorDos):
            print("Rut ingresado no tiene permisos suficientes.")
        if(rutIngreso == rutTrabajadorTres): 
            print("Rut ingresado no tiene permisos suficientes.")
        if(rutIngreso == "salir"):
            print("Hasta pronto")
            break
        if(rutIngreso != rutTrabajadorUno and rutIngreso != rutTrabajadorDos and rutIngreso != rutTrabajadorTres and rutIngreso != rutAdmin):
            print("Rut ingresado no valido")
        #Todo esto es el inicio de sesion
    if(rutIngreso == "salir"):
        os.system("pause")
        break

    #Salirse del ciclo principal en caso de que sea cualquiera de los 3 trabajadores-------------------------
    while(True):
        os.system("cls")
        menu()
        while(True):
            try:
                op=int(input("Ingrese la opción deseada: "))
                if(op>0 and op<3):
                    break
                else:
                    print("Ingrese una opcion correcta, entre 1 y 2")
            except ValueError:
                    print("Debe ingresar un número entero ")
        if(op==1):
            os.system("cls")
            datosTrabajador()
        if(op==2):
            os.system("cls")
            Salir()
            os.system("pause")
            os.system("cls")
            break
    if(op==2):
        break