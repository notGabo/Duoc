'''Un electricista tiene un contrato, en donde se especifica que el primer mes el
sueldo sera de ´ $500.000 y le ofrecen $2.000 de aumento mensual a modo de
incentivo para que no se cambie de empresa. Si si representa el sueldo que recibe
el electricista en el mes i,

s1=500000
s2=502000
s3=504000

Aritmetica:

502000-500000=2000   
504000-502000=2000
d=2000

a) Escriba la expresion algebraica para el t ´ ermino ´ si.

R=  S(i) = s(i) + (i-1) * d
    S(i) = 500000 + (i-1) * 2000
           500000 +  2000i - 2000
           498000 + 2000i

b) Escriba la expresion algebraica que calcula el total de dinero que percibe ´
el electricista por concepto de sueldo, durante los n primeros meses de
contrato.

r=  Sumatoria E(n) i=1:
forumula sumatoria      N/2(2*S(1)+(n-1)*d)
                        N/2(2*500000+(n-1)2000) (se puede seguir simplificando)


c) Escriba un codigo Python, que involucre bucles, y que calcule el total de ´
dinero recibido por el electricista durante los meses de su tercer ano de ˜
contrato.
d) Exprese en notacion de sumatoria el total aludido en la parte ´ c). Determine
este resultado en un codigo Python aplicando f ´ ormulas de suma aritm ´ etica ´
o geometrica, seg ´ un sea el caso. ´
e) Determine e interprete Â24
i=13 si.'''