DROP TABLE empleados;
DROP TABLE empleados_retirados;
DROP TABLE DETALLE_PAGO_BONATRAB;
DROP TABLE TRAMO_BONIF_ANNOS_TRAB;

CREATE TABLE empleados_retirados 
AS SELECT * FROM employees;
TRUNCATE TABLE empleados_retirados;

CREATE TABLE EMPLEADOS
AS SELECT * FROM employees;

CREATE TABLE TRAMO_BONIF_ANNOS_TRAB
(rango_ini NUMBER(2) NOT NULL,
 rango_fin NUMBER(2) NOT NULL,
 porc_bonif NUMBER(2) NOT NULL,
 CONSTRAINT PK_TBONIF_ANNOS_TRAB PRIMARY KEY(rango_ini,rango_fin));

CREATE TABLE DETALLE_PAGO_BONATRAB
(employee_id NUMBER(3) CONSTRAINT PK_DET_PAGO_BONATRAB PRIMARY KEY,
 department_id NUMBER(4),
 salario_actual NUMBER(8) NOT NULL,
 annos_trab NUMBER(2) NOT NULL,
 monto_bonif NUMBER(8) NOT NULL);

INSERT INTO TRAMO_BONIF_ANNOS_TRAB VALUES(15,17,5);
INSERT INTO TRAMO_BONIF_ANNOS_TRAB VALUES(18,21,12);
INSERT INTO TRAMO_BONIF_ANNOS_TRAB VALUES(22,25,15);
INSERT INTO TRAMO_BONIF_ANNOS_TRAB VALUES(26,30,18);
COMMIT;