-- SHOW USER; // user es system
SELECT * FROM dba_data_files;


ALTER SESSION SET "_ORACLE_SCRIPT"=TRUE;
--Creacion de tablespaces 
    --tablespace datos
CREATE TABLESPACE TBS_TOUR_DAT 
DATAFILE 'C:\APP\GABOS\PRODUCT\18.0.0\ORADATA\XE\DF_TURISMO_001.DBF'
SIZE 20M  AUTOEXTEND ON;

    --tablespace index
CREATE TABLESPACE TBS_TOUR_IDX 
DATAFILE 'C:\APP\GABOS\PRODUCT\18.0.0\ORADATA\XE\DF_TURISMO_002.DBF'
SIZE 20M  AUTOEXTEND ON;

CREATE USER owner_prueba3 IDENTIFIED BY 1234 DEFAULT TABLESPACE SYSAUX QUOTA 10M ON SYSAUX;
GRANT CONNECT,RESOURCE TO owner_prueba3;

--REQUERIMIENTO 1

--creacion de users (1)
--OWNER
CREATE USER OWNER_PRUEBA3 IDENTIFIED BY 1234
DEFAULT TABLESPACE SYSAUX QUOTA 10M ON SYSAUX;

GRANT CONNECT, RESOURCE TO OWNER_PRUEBA3;

--DEVELOPER P3
CREATE USER DEVELOPER_P3 IDENTIFIED BY 1234
DEFAULT TABLESPACE TBS_TOUR_DAT QUOTA 6M ON TBS_TOUR_DAT;
GRANT CONNECT TO DEVELOPER_P3;


--Acciones (ROLES) (2)
CREATE ROLE ROL_OWNER;
GRANT CREATE SEQUENCE, CREATE SYNONYM ,CREATE ANY INDEX TO ROL_OWNER;

CREATE ROLE ROL_DEVELOPER;
GRANT CREATE PROCEDURE, CREATE TRIGGER, CREATE ANY VIEW TO rol_developer;
 
--Acceso a datos (3)
    --Acceso a consultas en developer
GRANT SELECT ON owner_prueba3.agencia to rol_developer;
GRANT SELECT ON owner_prueba3.procedencia to rol_developer;
GRANT SELECT ON owner_prueba3.cliente to rol_developer;
grant SELECT ON owner_prueba3.reserva to rol_developer;
G
    --Acceso a modificar, insertar eliminar info en developer
/*GRANT UPDATE ON owner_prueba3.credito_cliente , owner_prueba3.cuota_credito_cliente TO rol_developer;
  GRANT INSERT ON owner_prueba3.credito_cliente , owner_prueba3.cuota_credito_cliente TO rol_developer;
  GRANT DROP ON owner_prueba3.credito_cliente , owner_prueba3.cuota_credito_cliente TO rol_developer; */
  
--Estas tablas no existen en el script del owner, por lo tanto 
--si se ejecutan, darian error al momento de otorgar los permisos

    --Creacion de sinonimos  para las tablas usadas en developer
CREATE PUBLIC SYNONYM confidencialUno FOR owner_prueba3.agencia;
CREATE PUBLIC SYNONYM confidencialDos FOR owner_prueba3.procedencia;
CREATE PUBLIC SYNONYM confidencialTres FOR owner_prueba3.cliente;
CREATE PUBLIC SYNONYM confidencialCuatro FOR owner_prueba3.reserva;

    --Creacion de usuarios consultores externos
        --user 1
CREATE USER USERCONSULTOR1 IDENTIFIED BY 1234
DEFAULT TABLESPACE TBS_TOUR_DAT QUOTA 3M ON TBS_TOUR_DAT;
GRANT CONNECT TO USERCONSULTOR1;

        --user2
CREATE USER USERCONSULTOR2 IDENTIFIED BY 1234
DEFAULT TABLESPACE TBS_TOUR_DAT QUOTA 3M ON TBS_TOUR_DAT;
GRANT CONNECT TO USERCONSULTOR2;

        --user3
CREATE USER USERCONSULTOR3 IDENTIFIED BY 1234
DEFAULT TABLESPACE TBS_TOUR_DAT QUOTA 3M ON TBS_TOUR_DAT;
GRANT CONNECT TO USERCONSULTOR3;

        --user4
CREATE USER USERCONSULTOR4 IDENTIFIED BY 1234
DEFAULT TABLESPACE TBS_TOUR_DAT QUOTA 3M ON TBS_TOUR_DAT;
GRANT CONNECT TO USERCONSULTOR4;

        --user5
CREATE USER USERCONSULTOR5 IDENTIFIED BY 1234
DEFAULT TABLESPACE TBS_TOUR_DAT QUOTA 3M ON TBS_TOUR_DAT;
GRANT CONNECT TO USERCONSULTOR5;

    --Creacion de sinonimos para tablas usadas en consultores
CREATE PUBLIC SYNONYM consultaUno FOR owner_prueba3.habitacion ;
CREATE PUBLIC SYNONYM consultaDos FOR owner_prueba3.reserva;
CREATE PUBLIC SYNONYM consultaTres FOR owner_prueba3.total_consumos;
CREATE PUBLIC SYNONYM consultaCuatro FOR owner_prueba3.consumo;

    --GRANT DE PERMISOS PARA USUARIOS CONSULTORES
GRANT SELECT on consultaUno to USERCONSULTOR1, USERCONSULTOR2,USERCONSULTOR3, USERCONSULTOR4,USERCONSULTOR5;
GRANT SELECT on consultaDos to USERCONSULTOR1, USERCONSULTOR2,USERCONSULTOR3, USERCONSULTOR4,USERCONSULTOR5;
GRANT SELECT on consultaTres to USERCONSULTOR1, USERCONSULTOR2,USERCONSULTOR3, USERCONSULTOR4,USERCONSULTOR5;
GRANT SELECT on consultaCuatro to USERCONSULTOR1, USERCONSULTOR2,USERCONSULTOR3, USERCONSULTOR4,USERCONSULTOR5;

--Estategias de asignacion de privilegios (4)
/*
•	Para la implementación, se debe considerar la eficiencia en la asignación de privilegios a los diferentes usuarios. 
    Esto significa que se debe tener presente:
    o	En qué escenario la mejor opción es asignar privilegios individuales a los usuarios.
        R: en el que sea un privilegios especificos para usuariuos en especificos
    o	En qué escenario la mejor opción es asignar a un conjunto de privilegios relacionados (ROLES) a los usuarios.
        R: Cuando sean privilegios en comunes para varios usarios en comun
    o	Seguir el principio de Menor Privilegio
*/



--caso 3
--Creacion Index
GRANT UNLIMITED TABLESPACE TO owner_prueba3;

CREATE INDEX owner_prueba3.INDEX_CONSUMO ON owner_prueba3.consumo(round(monto*815)) TABLESPACE TBS_TOUR_IDX;
CREATE INDEX owner_prueba3.INDEX_RESERVA ON owner_prueba3.reserva(id_cliente) TABLESPACE TBS_TOUR_IDX;
--No esta funcionando el index de reserva :( no supimos como arreglarla

DROP INDEX owner_prueba3.INDEX_CONSUMO;
DROP INDEX owner_prueba3.INDEX_RESERVA;


/* ********************************************************************************************************* */
GRANT ROL_OWNER TO OWNER_PRUEBA3;
GRANT ROL_DEVELOPER TO DEVELOPER_P3; 
--La otorgacion de roles la deje al final por temas de que mas adelante, los requisitos de la prueba 
--de vez en cuando pedian agregar algunos permisos adiciconales a algunos roles, asi que me salia mas
--comodo tenerlo aca a diferencia de que este entre medio del codigo


/*
¿Ud Logró crear todos los users en el tablespaces  especificado , cuántos pudo crear?, justifique su respuesta.

R: Si, logramos crear todos los usuarios, tanto el developer, owner y los usuarios consultantes. Estos ultimos fueron
los mas faciles de crear, ya que los permisos que tenian que tener eran los mismos, por lo que lo unico que habia que 
hacer era copiar y pegar la instruccion para luego cambiarle solamente el nombre de cada usuario 
*/








