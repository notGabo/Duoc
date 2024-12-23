--ENSAYO PRUEBA  NUMERO 1

--caso 2.1
SELECT
TO_CHAR(NUMRUN,'09G999G999')||'-'||UPPER(DVRUN) AS RUT,
(INITCAP(TRIM(APPATERNO)||' '||TRIM(APMATERNO)||' '||TRIM(PNOMBRE))) AS NOMBRE_CLI,
TO_CHAR(FECHA_NACIMIENTO,'DD/MM/YYYY') AS FECHA_NAC,
CASE COD_TIPO_CLIENTE
    WHEN 1 THEN 'Dependiente'
    WHEN 2 THEN 'Indepediente'
    WHEN 3 THEN 'Tercera Edad'
    ELSE 'Indefinido'
    END AS TIPO_CLI,
    COD_REGION
FROM CLIENTE
WHERE EXTRACT (YEAR FROM FECHA_NACIMIENTO) BETWEEN 1957 AND 1960
      AND (COD_REGION IN (2,3,15)
      OR COD_PROF_OFIC IN (1,2,3))
ORDER BY COD_TIPO_CLIENTE,FECHA_NACIMIENTO DESC;

--caso 2.2
SELECT
UPPER(TRIM(APPATERNO)||' '||TRIM(PNOMBRE)) AS NOMBRE,
'30 ' || CASE
            WHEN UPPER(SUBSTR(LTRIM(APPATERNO),1,1)) BETWEEN 'A' AND 'I' THEN 'Septiembre'
            WHEN UPPER(SUBSTR(LTRIM(APPATERNO),1,1)) IN ('J','K','N') THEN 'Octubre'
            WHEN UPPER(SUBSTR(LTRIM(APPATERNO),1,1)) BETWEEN 'O' AND 'S' THEN 'Noviembre'
            ELSE 'Diciembre'
            END || ' del '|| TO_CHAR (ADD_MONTHS(SYSDATE ,0), 'YYYY')
            AS "Habilita Encuesta el:",
LOWER(SUBSTR(TRIM(PNOMBRE),1,2)||'.'||TRIM(APPATERNO))||''||TRIM(NRO_CLIENTE)||'@gmail.com' AS "Enviar mail a:"
FROM CLIENTE
ORDER BY TRIM(APPATERNO) DESC;
--1.  Cu�l es el problema del caso planteado:
--R1: Un gran numero de clientes que han respondido una encuesta online para reclamos de productos o ejecutivos creada por una empresa externa al banco, esta empresa es de soporte TI.
--    Esto con el fin de captar nuevos clientes.
--2.  Cu�l es la soluci�n para el problema del caso planteado:
--R2: Una vez la fase de encuesta se haya concluido, al ser una cantidad grande de clientes se ha propuesto contactarlos en distintas semanas segun su apellido
--3.  Cu�l es la informaci�n significativa que necesita para resolver el problema:
--R3: Los nombre y apellido paterno de los clientes, las fechas en las que se habilitaran las encuestas y los numeros de cliente

--Caso 2.3
SELECT TO_CHAR(nro_cliente,'099999' ) AS NUMERO_CLI,
       --LPAD(nro_cliente, 6, '0') AS NUMERO_CLI_2,
       TRUNC(MONTHS_BETWEEN(  SYSDATE, fecha_inscripcion)/12) AS "A�OS ANTIGUEDAD" ,
       TO_CHAR(fecha_nacimiento, 'MM') AS MES_NACIMIENTO,
       TO_CHAR(
       CASE
          WHEN TRUNC(MONTHS_BETWEEN(  SYSDATE, fecha_inscripcion)/12) 
             BETWEEN 5 AND 10 THEN 500
          WHEN TRUNC(MONTHS_BETWEEN(  SYSDATE, fecha_inscripcion)/12) 
             BETWEEN 11 AND 20 THEN 600
         WHEN TRUNC(MONTHS_BETWEEN(  SYSDATE, fecha_inscripcion)/12) > 20
             THEN 700
         ELSE 0    
       END * EXTRACT( MONTH FROM fecha_nacimiento ) ,'9G999' ) AS PUNTAJE       
FROM cliente
ORDER BY PUNTAJE DESC;
 
--Caso 2.4
DROP TABLE POSIBLES_CLIENTES;
CREATE TABLE POSIBLES_CLIENTES AS
    SELECT
    TO_CHAR(RTRIM(SUBSTR(RUN,1,8)),'09999999')||'-'||SUBSTR(RTRIM(RUN),-1) AS RUT,
    CASE
        WHEN INSTR(TRIM(NOMBRE),'-',1,1)=11 THEN INITCAP(SUBSTR(TRIM(NOMBRE),1,9))
        WHEN INSTR(TRIM(NOMBRE),'-',1,1)=9 THEN INITCAP(SUBSTR(TRIM(NOMBRE),1,8))
        WHEN INSTR(TRIM(NOMBRE),'-',1,1)=8 THEN INITCAP(SUBSTR(TRIM(NOMBRE),1,7))
        WHEN INSTR(TRIM(NOMBRE),'-',1,1)=7 THEN INITCAP(SUBSTR(TRIM(NOMBRE),1,6))
        WHEN INSTR(TRIM(NOMBRE),'-',1,1)=6 THEN INITCAP(SUBSTR(TRIM(NOMBRE),1,5))
        WHEN INSTR(TRIM(NOMBRE),'-',1,1)=5 THEN INITCAP(SUBSTR(TRIM(NOMBRE),1,4))
        END AS NOMBRE_C,
    CASE
        WHEN INSTR(TRIM(NOMBRE),'-',1,2)=13 THEN INITCAP(TRIM(SUBSTR(LTRIM(NOMBRE),14)))
        WHEN INSTR(TRIM(NOMBRE),'-',1,2)=11 THEN INITCAP(TRIM(SUBSTR(LTRIM(NOMBRE),12)))
        WHEN INSTR(TRIM(NOMBRE),'-',1,2)=10 THEN INITCAP(TRIM(SUBSTR(LTRIM(NOMBRE),11)))
        WHEN INSTR(TRIM(NOMBRE),'-',1,2)=9 THEN INITCAP(TRIM(SUBSTR(LTRIM(NOMBRE),10)))
        WHEN INSTR(TRIM(NOMBRE),'-',1,2)=8 THEN INITCAP(TRIM(SUBSTR(LTRIM(NOMBRE),9)))
        WHEN INSTR(TRIM(NOMBRE),'-',1,2)=7 THEN INITCAP(TRIM(SUBSTR(LTRIM(NOMBRE),8)))
        END AS APELLIDO_C
    FROM PROSPECTOS_CLIENTE
    ORDER BY NOMBRE;
    
--Caso 2.5
SELECT 
TRIM(APPATERNO) ||' '|| TRIM(APMATERNO) ||' '|| TRIM(PNOMBRE) AS "NOMBRE CLIENTE",
NVL(CORREO,'No Existe e-mail') as CORREO,
NVL(LPAD(FONO_CONTACTO,17,'0'),'Falta informaci�n') AS CONTACTO
FROM CLIENTE
WHERE   LOWER(DIRECCION)LIKE '%san%' AND 
--      INSTR(UPPER(DIRECCION),'SAN',1,1)>0    (ES LO MISMO QUE LA LINEA ANTERIOR PERO ESCRITO DE MANERA MAS UNIVERSAL PARA OTROS MOTORES DE SQL)  
        (UPPER(CORREO) LIKE '%.CL%' OR CORREO IS NULL)
ORDER BY 3 DESC, 2;