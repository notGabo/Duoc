class Bus:
    def __init__(self,nombre):
        self.posicion = 0
        self.nombre = nombre

    @staticmethod
    def PistaInicio():
        print("-"*100)

    def DibujarBus(self, desfase, nombre):
        self.posicion += desfase
        print(" "*100)
        print(f"{' '*self.posicion}{nombre}")
        print(f"{' '*self.posicion}🚌")

    @staticmethod
    def PistaFinal():
        print("-"*100)