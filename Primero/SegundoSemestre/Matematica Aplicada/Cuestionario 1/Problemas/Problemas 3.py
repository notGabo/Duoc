import os
'''
 Una casa se arrienda por 2 anos, considerando que durante este periodo el arriendo ˜
se incrementara todos los meses en un ´ 2 %. Considere que ai representa el valor
a pagar por el arriendo del mes i. Si para el primer mes de arriendo se debe pagar
$180.000, entonces:
a) Escribir la expresion algebraica para el t ´ ermino ´ ai.
a1=180000 
180000*1.02 (102%) = 183000*1.02 = 187272
a2=183000
a3=187272

Es una sucesion geometrica. A1/A2= 1.02 Y A3/A2= 1.02. Por lo tanto R= 1.02

b) Escriba la expresion algebraica que calcula el total cancelado por el arriendo ´
correspondiente a los n primeros meses.

a(n)=a(1)*r^(n-1)
A(N)=180000*1.02^(n-1)

c) Escriba un codigo Python, que involucre bucles, y que calcule el total de ´
dinero cancelado por el arriendo correspondiente a los meses del primer
semestre del segundo ano. Al redactar su respuesta, fuera del c ˜ odigo, utilice ´
notacion de sumatoria. ´

os.system('cls')
sum=0
for d in range(13,19):
    valor=180000*1.02**(d-1)
    sum+=valor
print(f'c) la suma es {sum} ')

R: 1440040

d) Exprese en notacion de sumatoria el total aludido en la parte ´ c). Determine
este resultado en un codigo Python aplicando f ´ ormulas de suma aritm ´ etica ´
o geometrica, seg ´ un sea el caso. ´

a1=180000
r=1.02
n=18
sum1=a1*(r**n-1)/(r-1)

n=12
sum2=a1*(r**n-1)/(r-1)

print(sum1-sum2)

R:1440040.0771235502

(PISTA: USA LAS RESTAS ENTRE SUMATORIAS)

e) Determine e interprete Â24
i=19 ai.

'''

