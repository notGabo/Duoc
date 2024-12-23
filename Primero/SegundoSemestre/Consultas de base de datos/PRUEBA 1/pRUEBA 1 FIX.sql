--Caso 1
DROP TABLE MOVIMIENTOS_CLIENTE;
CREATE TABLE MOVIMIENTOS_CLIENTE AS
    SELECT 
    TO_CHAR(SUBSTR(RUTCLIENTE,1,LENGTH(RUTCLIENTE)-2),'09G999G999')||'-'||SUBSTR(RUTCLIENTE,LENGTH(RUTCLIENTE),1) AS RUT_CLI,
    INITCAP(TO_CHAR(FECHA,'MONTH'))||' '|| TO_CHAR((FECHA),'YYYY') AS PERIODO,
    TRIM(TO_CHAR(TOTAL,'0000999999')) AS MONTO_BOLETA
    FROM BOLETA
    WHERE (CODPAGO = 2) AND 
        (CODBANCO = 1 OR CODBANCO = 3) AND
        EXTRACT (YEAR FROM FECHA)<=EXTRACT (YEAR FROM SYSDATE)
    ORDER BY FECHA DESC;
    
SELECT * FROM movimientos_cliente;    
--------------------------------------------------------------------------------------------------------------------------------

--Caso 2
SELECT
TRIM(TO_CHAR(SUBSTR(RUTVENDEDOR,1,LENGTH(RUTVENDEDOR)-2),'09G999G999'))||'-'||SUBSTR(RUTVENDEDOR,LENGTH(RUTVENDEDOR),1) AS "RUT VENDEDOR",
SUELDO_BASE,
TO_NUMBER(EXTRACT (YEAR FROM SYSDATE))-TO_NUMBER(EXTRACT (YEAR FROM FECHA_NAC)) AS EDAD,
NVL(TO_CHAR(comision,'0D9'),'NO TIENE COMISI�N') AS COMISI�N,
CASE 
    WHEN TO_NUMBER(TRUNC(MONTHS_BETWEEN(SYSDATE,fecha_nac)/12)) BETWEEN 17 AND 25 then RTRIM(TO_CHAR(SUELDO_BASE*1.055,'$9G999G999'))
    WHEN TO_NUMBER(TRUNC(MONTHS_BETWEEN(SYSDATE,fecha_nac)/12)) BETWEEN 25 AND 30 then RTRIM(TO_CHAR(SUELDO_BASE*1.1,'$9G999G999'))
    WHEN TO_NUMBER(TRUNC(MONTHS_BETWEEN(SYSDATE,fecha_nac)/12)) > 30 then RTRIM(TO_CHAR(SUELDO_BASE*1.15,'$9g999G999'))
END AS "SUELDO REAJUSTADO"
from VENDEDOR
WHERE CODCOMUNA IN(9,7,5) OR 
      LOWER(DIRECCION) LIKE '%alameda%'
ORDER BY 3;
--------------------------------------------------------------------------------------------------------------------------------
--Caso 3
SELECT
INITCAP(TRIM(SUBSTR(TRIM(nombre),1, INSTR(TRIM(nombre),' ',1)-1)||' '||
        substr(LTRIM(substr(TRIM(nombre), instr(trim(nombre),' ',3)))||' ', 1, instr(LTRIM(substr(TRIM(nombre), instr(trim(nombre),' ',3)))||' ', ' ', 1, 1))||
    LTRIM(substr(LTRIM(substr(TRIM(nombre), instr(trim(nombre),' ',3)))||' ', instr(LTRIM(substr(TRIM(nombre), instr(trim(nombre),' ',3)))||' ', ' ', 1, 1))))) as "VENDEDOR",
--CREDITOS AL NANO QUE SE LAS MANDO  CON ESA LINEA, DE NO HABER SIDO POR EL HUBIERA PUESTO ESTO DE ACA ABAJO
--INITCAP(TRIM(SUBSTR(TRIM(NOMBRE),1, INSTR(TRIM(NOMBRE),' ',1)-1)))||' '||INITCAP(TRIM(SUBSTR(TRIM(NOMBRE),INSTR(TRIM(NOMBRE),' ',3),LENGTH(TRIM(NOMBRE))))) AS "VENDEDOR",
'31 de '|| CASE
                WHEN INITCAP(SUBSTR(TRIM(DIRECCION),1,1)) BETWEEN 'A' and 'E' Then 'Marzo'
                WHEN INITCAP(SUBSTR(TRIM(DIRECCION),1,1)) IN ('F','H','J','K','L','M','N') Then 'Abril'
                WHEN INITCAP(SUBSTR(TRIM(DIRECCION),1,1)) BETWEEN 'O' and 'R' Then 'Mayo'
                ELSE 'Junio'  
           END ||' del '||TO_CHAR( ADD_MONTHS(SYSDATE,12), 'YYYY') AS "Citado el:",
LOWER(SUBSTR(NOMBRE,1,INSTR(TRIM(NOMBRE),' ',1)-1))||''||SUBSTR(TELEFONO,-3)||'@almacenesSyS.cl' AS "Enviar mail a:"
FROM VENDEDOR
ORDER BY 1, 2 desc;

/*
Explique con su palabras  c�mo abord�  el problema de la construcci�n del  mail que contiene un nombre no Normalizado en la base
de datos.
    R: Primero que todo me asegure usando la funcion trim al centro de las funciones anidadas para asegurarme de que esta venga 
       limpa desde el primer uso de su manipulacion de caracteres. Una vez obtuve este dato limpio, use la funcion INSTR
       para obtener la posicion referencial del primer espacio en el interior de la cadena y restarlo. Siguiente a esto aplique 
       la funcion SUBSTR para eliminar todo lo que es siguiente al caracter que es despues del espacio.
       
       Para los datos del telefono simplemente aplique la funcion SUBSTR, pero contando desde los ultimo, provocando que todo 
       lo que fuera anterior a estos 3 ultimos caracteres sean eliminados.
       
       Para terminar esta columna solamente tuve que concaternar con '@almacenesSyS.cl'
*/
--------------------------------------------------------------------------------------------------------------------------------

--Caso 4
DROP TABLE HORAS_EXTRAS_VENDEDOR;
CREATE TABLE HORAS_EXTRAS_VENDEDOR AS
    SELECT 
    TRIM(TO_CHAR(SUBSTR(RUTVENDEDOR,1,LENGTH(RUTVENDEDOR)-2),'009G999G999')) AS RUT_VENDEDOR,
    SUBSTR(RUTVENDEDOR,LENGTH(RUTVENDEDOR),1) AS DV,
    TRIM(TURNO_INI) AS HRA_INI,
    TRIM(TURNO_FIN) AS HRA_FIN,
    RPAD(24*(TO_DATE(TURNO_FIN,'HH24:MI')-TO_DATE(TURNO_INI,'HH24:MI')),10, ' ')+1 AS HH_EXTRAS_PAGAR,
    TO_CHAR(6500*(24*(TO_DATE(TURNO_FIN,'HH24:MI')-TO_DATE(TURNO_INI,'HH24:MI'))+1),'$999G999G999') AS "MONTO_A_PAGO"
    FROM TURNO_VENDEDOR
    WHERE TO_DATE(TURNO_INI,'HH24:SS')>TO_DATE('11:00','HH24:SS')
    ORDER BY 6 DESC;

SELECT * FROM HORAS_EXTRAS_VENDEDOR;

/*
Cu�l es la informaci�n significativa que necesita para resolver el problema:
    R: Principalmente se necesitan los atributos que usaremos para calcular las horas extras y el monto a pagar (estos serian
    los de TURNO_FIN y TURNO_INI), la hora en las que se contabilizaran los pagos extras (despues de las 11AM) y el valor de 
    cada hora extra ($6500 pesos por hora extra). Aparte a estos datos, se necesitan el Rut del vendedor, en el que se tendra 
    que darle un formateo para que tanto su DV como su RUT esten en columnas distintas.
    
Explique c�mo resolvi� el manejo de los turnos para generar los c�lculos de las horas extras:
    R: Lo primero que hay que hacer es reformatear los datos de ambos Turnos en fechas (estos estan en varchar) para poder 
       manipularlos. Hay que considerar las horas en un dia para poder ejecutar la ecuacion, ya que se tienen que multiplicar
       por el resultado de la resta entre los turnos. Luego de toda esta ecuacion, al resultado se le tiene que a�adir un +1 
       para equilibrar el resultado que este de. (este siempre daba un valor menos al que daba en la tabla del documento). Para
       finalizar se debe multiplicar por 6500 que seria el valor por hora adicional. 
       
       Una vez terminada esta ecuacion se debe formatear este dato para que lo arroje con el siguiente formato '$9.999.999'.
*/
--------------------------------------------------------------------------------------------------------------------------------