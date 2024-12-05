from time import sleep
from bus import Bus
from random import randint
from os import system, name

nombreBus1 = input("nombre del bus 1: ")
nombreBus2 = input("nombre del bus 2: ")

def limpiar_pantalla():
    if name == "nt":
        system("cls")
    else:
        system("clear")

def main():
    bus_1 = Bus(nombreBus1)
    bus_2 = Bus(nombreBus2)
    print("Carrera de buses")
    print(f"{bus_1.nombre} vs {bus_2.nombre}")
    sleep(1)

    while True:
        limpiar_pantalla()
        Bus.PistaInicio()
        bus_1.DibujarBus(randint(1,2), bus_1.nombre)
        bus_2.DibujarBus(randint(1,2), bus_2.nombre)
        Bus.PistaFinal()
        if bus_1.posicion >= 100 or bus_2.posicion >= 100:
            if bus_1.posicion > bus_2.posicion:
                print(f"{bus_1.nombre} ha ganado")
            else:
                print(f"{bus_2.nombre} ha ganado")
            break
        sleep(0.1)

main()