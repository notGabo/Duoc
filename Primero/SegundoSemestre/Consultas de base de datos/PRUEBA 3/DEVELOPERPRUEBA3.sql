--show user; user es developer_p3

CREATE OR REPLACE VIEW owner_prueba3.v_clientes_por_agencia AS
SELECT UPPER(a.nom_agencia) AS AGENCIA,
COUNT(c.id_cliente) AS "CLIENTES POR AGENCIA"
FROM confidencialUno A JOIN confidencialTres C ON (a.id_agenc = c.id_agencia)
                       JOIN confidencialCuatro R ON (r.id_cliente = c.id_cliente)
WHERE EXTRACT(YEAR FROM r.ingreso) = EXTRACT(YEAR FROM SYSDATE) - 2
GROUP BY a.nom_agencia
HAVING COUNT(c.id_cliente) <= (
                                SELECT ROUND(AVG(COUNT(c.id_cliente))) AS PROM
                                FROM confidencialUno A JOIN confidencialTres C ON (a.id_agenc = c.id_agencia)
                                                       JOIN confidencialCuatro R ON (r.id_cliente = c.id_cliente)
                                WHERE EXTRACT(YEAR FROM r.ingreso) = EXTRACT(YEAR FROM SYSDATE) - 2
                                AND (UPPER(a.nom_agencia) = 'VIAJES EL SOL') OR (UPPER(a.nom_agencia) = 'TRAVEL EL SOL')
                                GROUP BY a.nom_agencia
)
ORDER BY 2 DESC with read only;


/*
¿Cuál es el problema de negocio a resolver?  ¿Logró que su vista sea creada por el desarrollador , justifique?

R: El problema es diseñar una vista y automatizarla para que genere la informacion del año pasado de forma 
anual en el primer dia habil del año actual, sin embargo la dificultad que presenta este problema son los datos 
en las tablas de las cuales se tienen acceso, ya que las que tienen informacion relevante no tienen datos de tipo
Date para poder manejar esa regla de negocio. Por lo que la unica forma que acudimos para poder resolver este problema 
fue otorgando permisos de select y sinonimos a la tabla de Reserva para asi poder de alguna forma unir esos datos y ejecutar
la consulta.

¿Cuál es la información significativa que necesita para resolver el problema?
R: Las fechas de reserva para poder saber cuales son los clientes que hay entre año y año, la cantidad de clientes y 
cuales son las agencias.
*\

/*      
Alternativa 1: que la base de datos tuviera implementada el dato DATE que faltaba en alguna de las tablas que se pedian al principio
(agencia y cliente). Con esto no se iba a dar la necesidad de implementar las tablas de reservas en los roles indicados .

Alternativa 2: Añadir a las otorgaciones de consultas la tabla de reservas, y que tenga una union mas directa en las tablas necesitadas
de forma mas directa.

RIEGOS Y VENTAJAS 1: Como riesgo, este perderia toda la estadistica sobre el año anterior, pero como ventaja la consulta seria mucho mas
facil de ejecutarla.

RIESGOS Y VENTAJAS 2: Como riesgo, seria muy probable de que todo el modelo se tenga que reorganizar, pero como ventaja, al igual que la
anterior, la ejecucion de la consulta seria mucho mas facil.

fundamento de la alternativa:

Como mencione anteriormente, esto podria ser un gran riesgo por el hecho de que se tendria que reorganizar toda el modelo, pero 
escoji esta solucion principalmente por comodidad tanto de trabajo a futuro como actual. 

CREATE OR REPLACE VIEW owner_prueba3.v_clientes_por_agencia AS
SELECT UPPER(a.nom_agencia) AS AGENCIA,
COUNT(c.id_cliente) AS "CLIENTES POR AGENCIA"
FROM confidencialUno A JOIN confidencialTres C ON (a.id_agenc = c.id_agencia)
GROUP BY a.nom_agencia
HAVING COUNT(c.id_cliente) <= (
                                SELECT ROUND(AVG(COUNT(c.id_cliente))) AS PROM
                                FROM confidencialUno A JOIN confidencialTres C ON (a.id_agenc = c.id_agencia)
                                                       JOIN confidencialCuatro R ON (r.id_cliente = c.id_cliente)
                                WHERE (UPPER(a.nom_agencia) = 'VIAJES EL SOL') OR (UPPER(a.nom_agencia) = 'TRAVEL EL SOL')
                                GROUP BY a.nom_agencia
)
ORDER BY 2 DESC with read only;

*/


