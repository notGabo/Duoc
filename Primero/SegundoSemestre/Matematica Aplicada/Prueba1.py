import numpy as np
'''
#Pregunta 2
for n in range(1,23):
    valor=2000+(3/5)*(n**2)+(1/8)*n
    print(f"{n} es {valor}")

#Pregunta 3
fi in range(1,9):
    valor=2000000*1.015**(i-1)    
    print(valor)

#Pregunta 4
for i in range(1,9):
    valor=2000000*1.015**(i-1)    
    print(valor)

#Pregunta 5
#a(n) = a(1) + (n-1) * d
#       600 + (n-1) * 18

#Pregunta 6
sum=0
for e in range(1,61):
    valor= 400 + (e-1) * 12
    
    print(f"mes {e} es {valor}")

#Pregunta 7
#Año 4
#mes 48 y 60 (sumatoria)

#pregunta 9
sum=0
for e in range(1,61):
    valor= 400 + (e-1) * 12
    sum+=valor
    print(f"mes {e} es {sum}")

#Pregunta 13
#rancuagua 104 talca 407

sum=0 
for i in range(1,21):
    valor=(400*(1.03**(i)-1))/(1.03-1)
    sum+=valor
    print(sum)
#102353.14298199833 20 iteraciones

sum=0 
for i in range(1,21):
    valor=(i/2)*(800+(i-1)*12)
    sum+=valor
    print(sum)

'''