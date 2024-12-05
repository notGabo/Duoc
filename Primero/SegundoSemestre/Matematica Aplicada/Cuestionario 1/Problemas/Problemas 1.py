import os
'''
1) 
Diego decide ahorrar en dolares para un viaje durante dos a ´ nos y medio. El ˜
primer mes ahorra 900 dolares, el segundo mes 810 d ´ olares, el tercer mes 729 ´
dolares, y as ´ ´ı sucesivamente. Represente por di la cantidad de dolares que ahorra ´
Diego en el mes i.
a) Escriba la expresion algebraica para el termino D sub i.

R=  a(n)=a(1)*r^(n-1)               d2/d1=0.9   d3/d2=0.9   r=0.9   
    d(i)=d(1)*0.9^(i-1) 

b) Escriba la expresion algebraica que calcula el total de dinero ahorrado por ´
Diego durante los primeros n meses.

R=  (SUMATORIA)
        n
        E   =   A(i)=A(1)*(r^n-1)   =   A(i)=900*(0.9^n-1)
       n=1           ------------            ------------
                         r-1                     0.9-1
                  
c) Determine e interprete sumatoria E(12) i=1
 d(i).

Python:
sum=0
for d in range(1,13):
    valor=900*0.9**(d-1)
    sum+=valor
print(f'la suma es {sum} ')

Normal:
a(1)=900*(0.9^(12-1))      900*(-0.7175)    -645.8134
     ----------------  =  -------------- = ----------- = 6458.134
            0.9-1               -0.1            -0.1


d) Determine e interprete sumatoria E(30) i=25 d(i).
Python:
sum=0
for d in range(25,31):
    valor=900*0.9**(d-1)
    sum+=valor
print(f'd) la suma es {sum} ')

Normal:

e) Exprese en notacion de sumatoria y determine el total ahorrado por Diego ´
durante el segundo año. ˜
f) Exprese en notacion de sumatoria y determine el total ahorrado por Diego ´
para el viaje que tiene programado hacer
'''
os.system('cls')
sum=0
for d in range(1,13):
    valor=900*0.9**(d-1)
    sum+=valor
print(f'c) la suma es {sum} ')


sum=0
for d in range(25,31):
    valor=900*0.9**(d-1)
    sum+=valor
print(f'd) la suma es {sum} ')


