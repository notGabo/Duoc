import math
'''
Una sucesion geometrica es una sucesion tal que entre un termino y el anterior
existe una razon constante. Dicho de otro modo, si dividimos o multiplicamos 2 terminos consecutivos 
cualquier resultado es una razon R constante.

ej: 
2 : 4 : 8 : 16 : 32 : 64 : 128      (: = division)
  Y   Y   Y    Y    Y    Y        
  2   2   2    2    2    2

si la razon resultante es mayor que 1 es creciente y si es menor que 1 es decreciente,
en el caso anterior la sucesion es creciente ya que sus valores divididos daban 2 (2>1)

Expresion general sucesion geometrica

a(n)=a(1)*r^(n-1)

Para sacar a(2)
a(2)=a(1)*r
Para sacar a(3)
a(3)=a(1)*r^2
Para sacar a(4)
a(4)=a(1)*r^3


Para encontrar el lugar especifico de una sucesion geometrica 
se tienen que usar logaritmos (en python se importa la libreria math [import math] usando math.log)
Ej:

log r * (an/a1) + 1

o usando python:

math.log(a(n)/a(1),r) + 1
'''

'''
Problema 1

1)
sucesion geometrica 4   6   9
razon = 6/4=1.5      razon=r


2)
a(n)=a(1)*r^(n-1) -> a(n)=4*1.5^(n-1)

3)
a(n) = a(60)

a(60)=a(4)*1.5^(60-1)
a(60)=98.049.249.911,821390773591998933634

4)
El lugar que ocupa la sucesion 68.34375 es el lugar 8
n=math.log(68.34375/4,1.5)+1
n=8

'''

'''
Problemas 2

El tercer termino de una sucesion geometrica es 5 y el sexto termino es 40
Determine:

a(3)=5
a(6)=40

1) 
a(6)=a(3)*r^3
40=5*r^3
40/5=r^3
8=r^3
3^v8=r
2=r
    //

2)
a(n)=a(1)*r^(n-1)
     5=a(1)*2^(3-1)
     5=a(1)*4
     5/4=a(1)
     1.25=a(1)
              //


   
   

for n in range(1,658):
    valor = (3/2)*(n**3)-(2*n)
    sum=+valor
    print(f"{n} la posicion es {sum}")
    #425388775.5
    #425388775.5
'''
for h in range(1,13):
    valor = 5150000*1.023**(h-1)
    print(f"{h} la posicion es {valor}")
  