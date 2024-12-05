
pila = []
pilabackup = []

def mostrar():
    print(pila)

def añadir(parametro):
    pila.append(parametro)
    print(f"Se ha añadido el elemento {parametro} a la pila")

def eliminar(n:int):

    pilabackup.append(pila[n])
    pila.pop(n)
    print(f"Se ha eliminado el elemento {n} de la pila")

def mostrarbkp():
    print(pilabackup)

pila.append("hola")
pila.append("adios")

añadir("peopeo")

mostrar()

try:
    while True:
        numero = int(input("Ingrese el numero a eliminar: "))
        break
except ValueError:
    print("El valor ingresado no es un numero")

eliminar(numero)

print("pila:")
mostrar()

print("pila backup:")
mostrarbkp()


