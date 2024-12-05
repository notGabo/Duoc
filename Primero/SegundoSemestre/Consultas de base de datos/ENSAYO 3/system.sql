--SYSTEM: D B A (ADMIN)
select * from dba_data_files;

--FLEXIBILIZA LOS NOMBRES USERS, ROLES, ARCHIVOS

alter session set "_ORACLE_SCRIPT"=TRUE;

--owner
create user ENSAYO3 identified by 1234
default tablespace sysaux quota 3M on sysaux;

grant connect, resource to ENSAYO3;

--caso 1
--crear un tablespace de 10 megas con nombre "informatica"
create tablespace INFORMATICA datafile 'C:\APP\GABOS\PRODUCT\18.0.0\ORADATA\XE\INFO_001.DBF'
size 10M autoextend on; --Autoextend permite que pueda crecer mas alla de 10 megas

--caso 2 
create user prog_externo1 identified by 1234
default tablespace informatica quota 3M on informatica
PASSWORD EXPIRE; --OBLIGAR A QUE CAMBIE LA CLAVE 

create user prog_externo2 identified by 1234
default tablespace informatica quota 3M on informatica
PASSWORD EXPIRE; --OBLIGAR A QUE CAMBIE LA CLAVE 

--CASO 3
create role rol_pexterno;
grant connect, create table, create view to rol_pexterno;
GRANT SELECT ON ENSAYO3.EQUIPO TO rol_pexterno;
GRANT SELECT ON ENSAYO3.TIPO_EQUIPO TO rol_pexterno;
GRANT SELECT ON ENSAYO3.EMPLEADO TO rol_pexterno;
GRANT rol_pexterno to prog_externo1, prog_externo2;
--CASO 6


--caso 8 en DBA
create index IDX_EQUIPO1 on ensayo3.equipo (color) tablespace informatica;
create index IDX_EQUIPO2 ON ensayo3.equipo (upper(color)) tablespace informatica;
