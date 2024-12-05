import numpy as np
import matplotlib.pyplot as plt
import os

np.set_printoptions(suppress=True)
'''
x=np.arange(0,13,1)
f=(2/3*x)+48
plt.plot(x,f,'r')
plt.title("Estatura de un niño en su primer año de vida")
plt.xlabel("Edad (meses)")
plt.ylabel("Estatura (cm)")
plt.grid(True)
plt.show()
'''
'''
x=np.arange(0,4.1,0.1)
f=-25*x**2+100*x
plt.plot(x,f)
plt.title("Altura de un montacarga en relacion a minutos")
plt.xlabel("Tiempo en minutos")
plt.ylabel("Altura en metros")
plt.show()
'''


'''
Funcion lineal
******* ******

f(x) = mx+n // M = pendiente || N = intercepto

ej: f(x) = 3x+2 // M = 3 || N = 2 
    f(x) = -2x+-6 // M = -2 || N = -6
    f(x) = 4.3x+2 // M = 4.3 || N = 2

    Formula calculo pendiente (M)
    ******* ******* ********* ***

        M = (y2-y1)/(x2-x1)
        
        La pendiente es la inclinacion de la recta o funcion

        Se puede calcular conociendo dos puntos del grafico
        que esten en la misma funcion

        Avanza de forma proporcional en Y cuando X avanza en 1. Ej: X m=3. avanza 1, por lo que Y avanzara en 3
'''

'''
x=np.arange(-10,10,1)

#Alteracion de pendiente
f1 = 1*x+1
f2 = 2*x+1
f3 = 3*x+1

#Alteracion de intercepto
y1 = 1*x+8
y2 = 1*x+9
y3 = 1*x+10


plt.plot(x,f1,'b', x,f2,'r', x,f3,'g', x,y1,'b', x,y2,'r', x,y3,'g')
plt.title("")
plt.xlabel("")
plt.ylabel("")
plt.grid(True)
plt.show()
'''


#Nota: variable independiente siempre esta en el eje X

#Problema 1
'''
Los alumnos de recursos naturales modelaron la poblacion de abejas en la ciudad ´
de Santiago con la funcion lineal A(t) = -9780t+997560, donde T es el tiempo
transcurrido en meses iniciada la investigacion
'''
'''
T = np.arange(0,120,1)
A = -9780*T+997560
plt.plot(T,A,'y')
plt.title("Poblacion de abejas en santiago segun el tiempo")
plt.xlabel("Tiempo (meses)")
plt.ylabel("Cantidad de abejas")
plt.grid(True)
plt.show()
#Ejercicio incompleto
'''

#Problema 2
'''
En un taller mecanico se analizan los ingresos en pesos obtenidos por la reparacion
de bujias en autos. Estos ingresos estan modelados por una funcion lineal f(x),
donde la variable x representa la cantidad de autos reparados
'''
'''
#f(x)= mx+n
#De la funcion se sabe que el punto 1 esta en (10,100000) y el punto 2 esta en (30,250000)
#Por lo tanto la pendiente es:
m = (250000-100000)/(30-10)


x = np.arange(0,30)
f = m*x+250000
plt.plot(x,f,'b')
plt.grid(True)
plt.show() 


'''


#Guia 6 problema 5
'''
 El costo de arriendo de un local comenzo en $230.000, acordando un incremento
de $15.000 anualmente. El contrato de arriendo duro 7 años.
'''
#1. f(x) = 15000x+230000
#2. Independiente : tiempo || dependiente : costo del arriendo
#3. [0,7]
#4. la pendiente equivale al incremento anual que tiene el arriendo del local
#5.
'''
15000x+230000=365000
       15000x=365000-200000
       15000x=135000
            x=135000/15000
            x=9
               //
Despues de 9 años el contrato aumenta a 365000, pero el valor de tiempo esta fuera del dominio
indicado en la funcion ([0,7])

'''



'''
FUNCIONES CUADRATICAS
********* ***********

La ecuacion cuadratica forma una parabola:

|               |
|               |
|               |
|               |
\              /
 \            /
  \          /
   \        /
    \      /
     \    /
      \__/ 
       *   = vertice de la parabola

ecuacion de una ecuacion cuadratica: f(x) =  ax**2+bx+c

a= indica si la parabola esta abierta hacia arriba o hacia abajo segun su polaridad (a + : u) (a - : n) 
c= indica el intercepto es donde corta Y
vertice = indica cual es el punto de simetria de la parabola, al mismo tiempo siendo su punto mas bajo

Calcular la coordenada x del vertice :
**************************************    
    Xv= -b/2*a

    ejemplo
    f(x) = 2x**2-8x+3

    Xv=-(-8)/2*2
      =8/4
      =2
         //

Calcular la coordenada y del vertice :
**************************************

    Una vez se calcula la coordenada X se procede a calcular la cooredenada Y reemplazando valores en la funcion:
    retomando el mismo ejemplo:

    f(x) = 2x**2-8x+3
    f(2) = 2*2**2-8*2+3
         = 8-13
         = -5
                //

Ahora que se conocen los 2 puntos del vertice se pueden formar las coordendas, tales quedaron como (2,-5)

**ecuacion general : ( -b±√(b²-4ac) ) / (2a)


f(x) = -t²+8t
f(15) = -15²+8*15

pasar a a ecuacion general:
f(x) = -t²+8t
( -b±√(b²-4ac) ) / (2a)
            
--------------------------
m = (250000-100000)/(30-10)


x = np.arange(0,30)
f = m*x+250000
plt.plot(x,f,'b')
plt.grid(True)
plt.show() 



Ecuacion general para funciones cuadraticas (forma parabolas)
*************************************************************
Si nuejstra funcion es cuadracitca, podemos escribirla como f(x)=ax**2+bx+c. Por lo
tanto, si reemplazamos los puntos que hemos marcado, podemos obtener
                    ax**2+bx+c=f(x)
 x  y
(2,6)  ->            a*2**2+b*2+c=6
(4,12) ->            a*4**2+b*4+c=12     
(6,30) ->            a*6**2+b*6+c=30
                    (4  2  1)   (a)   (6)
                    (14 4  1) * (b) = (12)
                    (36 6  1)   (c)   (30)
                 
'''
M = np.array([[4,2,1],[16,4,1],[36,6,1]])
N = np.array([6,12,30])

coeficientes = np.linalg.solve(M,N)
print(coeficientes)

#Coeficientes = a: 1.5, b:-6, c: 12 
#ax**2+bx+c=f(x)

#f(x)= 1.5x**2+-6*x+12

'''
-----------------------------


f(x) = ax**2+bx+c

(10,800)  = a*10**2+b*10+c = 800
          = 100a+10b+c = 800 

(20,1200) = a*20**2+b*20+c = 1200
          = 400a+20b+c = 1200

(30,1200) = a*30**2+b*30+c = 1200
          = 900a+30b+c = 1200  


m = np.array([[100,10,1],[400,20,1],[900,30,1]])
n = np.array([800,1200,1200])

coeficientes = np.linalg.solve(m,n)
print(coeficientes)
-------


10,5 = a*10**2+b*10+c = 5
 

23,5


30,3


m = np.array([[100,10,1],[529,23,1],[900,30,1]])
n = np.array([5,5,3])
solucion = np.linalg.solve(m,n)
print(solucion)
'''


