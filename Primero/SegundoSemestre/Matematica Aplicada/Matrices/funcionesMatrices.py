import numpy as np
np.set_printoptions(suppress=True)

#Como crear una matriz a partir de una funcion que 
#depende de los indices 
'''
M = np.fromfunction(lambda i , j : (i+1) + (j+1) , (2,2) )
print(M)

S = np.fromfunction(lambda i , j :  (i+1)**(j+1)+1, (3,3) )
print(S)

M=np.array[[9,14],[4,5]]
Q=np.array[[200,240,220],[175,210,215]]
G=M.dot(Q)
print(G)
'''

'''
#Problema 1
T=np.fromfunction(lambda i,j: 100*(i+1)*(j+1), (4,5) )
print(T)
#[[ 100.  200.  300.  400.  500.] 
# [ 200.  400.  600.  800. 1000.] 
# [ 300.  600.  900. 1200. 1500.] 
# [ 400.  800. 1200. 1600. 2000.]]

C=np.fromfunction(lambda i,j : ((i+1)*3)+((j+1)*5) , (5,6))
print(C)
#[[ 8. 13. 18. 23. 28. 33.]
# [11. 16. 21. 26. 31. 36.]
# [14. 19. 24. 29. 34. 39.]
# [17. 22. 27. 32. 37. 42.]
# [20. 25. 30. 35. 40. 45.]]

G=T.dot(C)
print(G)
#[[ 24000.  31500.  39000.  46500.  54000.  61500.] 
# [ 48000.  63000.  78000.  93000. 108000. 123000.] 
# [ 72000.  94500. 117000. 139500. 162000. 184500.] 
# [ 96000. 126000. 156000. 186000. 216000. 246000.]]
'''

'''
#Problema 2
M=np.array([[4.04,0.39],[69,4],[61,2],[804,66],[73,11]])
print(M)
#[[  4.04   0.39] 
# [ 69.     4.  ] 
# [ 61.     2.  ] 
# [804.    66.  ] 
# [ 73.    11.  ]]

G=np.array([[30,45,50],[45,60,75]])
print(G)
#[[30 45 50]
# [45 60 75]]

R=M.dot(G)
print(R)
#[[  138.75   205.2    231.25]
# [ 2250.    3345.    3750.  ]
# [ 1920.    2865.    3200.  ]
# [27090.   40140.   45150.  ]
# [ 2685.    3945.    4475.  ]]


#Problema 4
C=np.array([[300,272,240],[260,180,324]])
print('Produccion de China')
print(C)

I=np.array([[320,390,240],[230,220,210]])
print('Produccion de Indonesia')
print(I)

A=C+I
print('Prodccion en total entre ambas plantas')
print(A)

B=C*0.75+I*1.2
print('Produccion para el proximo año entre ambas plantas, desde que china produce un 25% menos y indonesia un 20% mas')
print(B)
'''
#Problema 5
M=np.fromfunction(lambda i,j: 1*(i+1)+(j+1)/(2*(i+1)), (2,3))
print(M)
P=np.fromfunction(lambda i,j: 210+20*(i+1)+10*(j+1), (3,4))
print(P)

T=M.dot(P)
print(T)