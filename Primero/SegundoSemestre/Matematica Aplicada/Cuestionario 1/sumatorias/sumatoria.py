import os
'''
Imaginemos la siguiente situacion: vamos a arrendar una casa durante dos años y el
primer mes nos cobraran $190000, pero en el contrato esta estipulado que cada mes
el arriendo aumenta en $3500 ¿Cuanto terminaremos pagando en total?
'''
'''
sum=0
for i in range(24):
    n=i=1
    valor=3500*n+186500
    sum=sum+valor
print(f'el valor total que se pagara en los 2 años {sum}')
'''

'''
mes=190000
aumento=3500
i=1
while(True):
    i+=1
    total=(aumento*i)+190000*i
    if(i==24):
        print(total)
        break
*hay que arreglarlo
'''

## https://sites.google.com/site/paprikacalculo/_/rsrc/1477884949267/contenido/7-sumatorias/7-1-sumatorias-y-notacion-sigma/actividad-1-3-638.jpg
## Uso de sigma para calculos manuales

'''
sum=0
for m in range(23,28):
    valor=3*m-5
    sum+=valor
print(f'la suma es {sum}')

sum=0
for k in range(5,10):
    valor=7*k**2
    sum+=valor
print(f'la suma es {sum}')
'''

'''
a=[]
sum=0
for i in range(13,25):
    valor=3*i**2+7
    sum+=valor
    a.append(valor)
print(f'la suma es {sum} \ny la lista es {a}')

os.system('cls')
#sumatoria 1
sum=0
for i in range(1,561):
    valor=61+7*i
    sum+=valor
print(f'la suma es {sum} ')

#sumatoria 2
sum=0
for i in range(45+4*i):
    valor=45+4*i
    sum+=valor
print(f'la suma es {sum} ')

#sumatoria 3
sum=0
for i in range(21,81):
    valor=7500+0.97**i
    sum+=valor
print(f'la suma es {sum} ')


sum=0
for i in range(120,321):
    valor=8*40**2+42*40
    sum+=valor
print(f'la suma es {sum} ')

print(8*40**2+42*40)



i=1
sum=0
while(True):
    valor=16*i+34
    sum+=valor
    if(sum==2430):
        print('el valor de n para llegar a 2430 es',i)
        break
    if(sum>2430):
        print('el valor de n da mas que 2430')
        break
    else:
        i+=1


#a(639058)=639058*1,0289^(n-1)

sum=0
for i in range(1,16):
    valor=639058*1.0289**(i-1)
    sum+=valor
print(f'la suma es {sum} ')


i=1
while(True):
    valor=489943*1.022**(i-1)
    sum=+valor
    if(i==15):
        print('el valor de 15 es',sum)
        break
    else:
        i+=1

i=1
while(True):
    valor=489943*1.022**(i-1)
    sum=+valor
    if(i==17):
        print('el valor de 15 es',sum)
        break
    else:
        i+=1
#694000 habitantes

valor=0
i=0
for i in range(1,18):
    valor=489943*1.022**(i-1)
    sum=+valor
    print('el valor de 15 es',sum)


print('valor=50*n**(2)-1 22 veces')
for n in range(1,23):
    valor=50*n**(2)-1
    sum=+valor
    print(f'n{n} es {sum}')



print('valor=(3/2)*n**3-(2*n) 426 veces')
for n in range(1,427):
    valor=(3/2)*n**3-(2*n)
    sum=+valor
    print(f'n{n} es {sum}')
#n426 es 115962312.0 wtff

#aritmetica
print(0.0625-0.0312)
print(0.125-0.0625)

#geo

print(0.0625/0.03125)
print(0.125/0.0625)
'''
'''
for n in range(1,16):
    valor=-464.1-(15-1)*9.7
    sum=valor
    print(f'n{n} es {sum}')


for n in range(1,2198):
    valor= 5+(n-1)*12
    sum=valor
    if(n==2197):
        print(f'n{n} es {sum}')
        break

'''
print(0.0625/0.03125)
print(0.125/0.0625)
for n in range(1,8):
    # a(n)=a(1)*r^(n-1)
    valor=0.03125*2**(n-1)
    sum=valor
    print(f'n{n} es {sum}')
