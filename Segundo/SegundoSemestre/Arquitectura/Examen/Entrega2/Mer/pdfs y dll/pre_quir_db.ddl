-- Generado por Oracle SQL Developer Data Modeler 22.2.0.165.1149
--   en:        2022-11-10 01:44:39 CLST
--   sitio:      Oracle Database 21c
--   tipo:      Oracle Database 21c



-- predefined type, no DDL - MDSYS.SDO_GEOMETRY

-- predefined type, no DDL - XMLTYPE

CREATE TABLE especialidad_persalud (
    cod_especialidad INTEGER NOT NULL,
    nom_especialidad VARCHAR2(20 CHAR) NOT NULL
);

ALTER TABLE especialidad_persalud ADD CONSTRAINT especialidad_persalud_pk PRIMARY KEY ( cod_especialidad );

CREATE TABLE evaluacion (
    id_evalu     INTEGER NOT NULL,
    fecha_hora   DATE NOT NULL,
    nivel_riesgo NUMBER(1) NOT NULL,
    diag_eva     VARCHAR2(250 CHAR) NOT NULL
);

ALTER TABLE evaluacion
    ADD CHECK ( nivel_riesgo IN ( 0, 1, 2 ) );

ALTER TABLE evaluacion ADD CONSTRAINT evaluacion_pk PRIMARY KEY ( id_evalu );

CREATE TABLE ficha_paciente (
    id_ficha              INTEGER NOT NULL,
    diagnostico_paciente  VARCHAR2(200 CHAR) NOT NULL,
    operaciones           VARCHAR2(15 CHAR) NOT NULL,
    riesgo_salud          VARCHAR2(10 CHAR) NOT NULL,
    evaluacion_id_evalu   INTEGER NOT NULL,
    paciente_rut_paciente VARCHAR2(9 CHAR) NOT NULL
);

CREATE UNIQUE INDEX ficha_paciente__idx ON
    ficha_paciente (
        paciente_rut_paciente
    ASC );

ALTER TABLE ficha_paciente ADD CONSTRAINT ficha_paciente_pk PRIMARY KEY ( id_ficha );

CREATE TABLE interconsulta (
    id_interconsulta        INTEGER NOT NULL,
    fecha                   DATE NOT NULL,
    obse_pacient            VARCHAR2(200 CHAR) NOT NULL,
    per_salud_rut_persalud  VARCHAR2(9 CHAR) NOT NULL,
    paciente_rut_paciente   VARCHAR2(9 CHAR) NOT NULL,
    ficha_paciente_id_ficha INTEGER NOT NULL
);

ALTER TABLE interconsulta ADD CONSTRAINT interconsulta_pk PRIMARY KEY ( id_interconsulta );

CREATE TABLE paciente (
    rut_paciente   VARCHAR2(9 CHAR) NOT NULL,
    nom_paciente   VARCHAR2(30 CHAR) NOT NULL,
    ape_paciente   VARCHAR2(30 CHAR) NOT NULL,
    fecha_nac      DATE NOT NULL,
    peso_kg        NUMBER(3, 2) NOT NULL,
    estatura_cm    NUMBER(3) NOT NULL,
    sexo           CHAR(1 CHAR) NOT NULL,
    correo         VARCHAR2(30 CHAR),
    direc_paciente VARCHAR2(50 CHAR) NOT NULL,
    num_emergencia NUMBER(10) NOT NULL,
    num_paciente   NUMBER(10) NOT NULL
);

ALTER TABLE paciente
    ADD CONSTRAINT sexo_nacimiento CHECK ( sexo IN ( 'F', 'M' ) );

COMMENT ON COLUMN paciente.estatura_cm IS
    '100';

COMMENT ON COLUMN paciente.sexo IS
    'F o M';

COMMENT ON COLUMN paciente.num_emergencia IS
    '56 999 999 99';

COMMENT ON COLUMN paciente.num_paciente IS
    '56 999 999 99';

ALTER TABLE paciente ADD CONSTRAINT paciente_pk PRIMARY KEY ( rut_paciente );

CREATE TABLE per_salud (
    rut_persalud         VARCHAR2(9 CHAR) NOT NULL,
    nombres              VARCHAR2(20 CHAR) NOT NULL,
    apellidos            VARCHAR2(20 CHAR) NOT NULL,
    cargo                VARCHAR2(15 CHAR) NOT NULL,
    unidad_id_unidad     INTEGER NOT NULL,
    esp_persalud_cod_esp INTEGER NOT NULL,
    seccion_id_seccion   INTEGER NOT NULL
);

ALTER TABLE per_salud ADD CONSTRAINT per_salud_pk PRIMARY KEY ( rut_persalud );

CREATE TABLE seccion (
    id_seccion   INTEGER NOT NULL,
    nom_seccion  VARCHAR2(20 CHAR) NOT NULL,
    rut_jefe_sec VARCHAR2(9 CHAR) NOT NULL
);

ALTER TABLE seccion ADD CONSTRAINT seccion_pk PRIMARY KEY ( id_seccion );

CREATE TABLE unidad (
    id_unidad  INTEGER NOT NULL,
    nom_unidad VARCHAR2(30 CHAR) NOT NULL
);

ALTER TABLE unidad ADD CONSTRAINT unidad_pk PRIMARY KEY ( id_unidad );

ALTER TABLE ficha_paciente
    ADD CONSTRAINT ficha_pac_eva_fk FOREIGN KEY ( evaluacion_id_evalu )
        REFERENCES evaluacion ( id_evalu );

ALTER TABLE ficha_paciente
    ADD CONSTRAINT ficha_pac_pac_fk FOREIGN KEY ( paciente_rut_paciente )
        REFERENCES paciente ( rut_paciente );

ALTER TABLE interconsulta
    ADD CONSTRAINT ic_ficha_paciente_fk FOREIGN KEY ( ficha_paciente_id_ficha )
        REFERENCES ficha_paciente ( id_ficha );

ALTER TABLE interconsulta
    ADD CONSTRAINT ic_paciente_fk FOREIGN KEY ( paciente_rut_paciente )
        REFERENCES paciente ( rut_paciente );

ALTER TABLE interconsulta
    ADD CONSTRAINT ic_per_salud_fk FOREIGN KEY ( per_salud_rut_persalud )
        REFERENCES per_salud ( rut_persalud );

ALTER TABLE per_salud
    ADD CONSTRAINT persalud_esp_persalud_fk FOREIGN KEY ( esp_persalud_cod_esp )
        REFERENCES especialidad_persalud ( cod_especialidad );

ALTER TABLE per_salud
    ADD CONSTRAINT persalud_seccion_fk FOREIGN KEY ( seccion_id_seccion )
        REFERENCES seccion ( id_seccion );

ALTER TABLE per_salud
    ADD CONSTRAINT persalud_unidad_fk FOREIGN KEY ( unidad_id_unidad )
        REFERENCES unidad ( id_unidad );



-- Informe de Resumen de Oracle SQL Developer Data Modeler: 
-- 
-- CREATE TABLE                             8
-- CREATE INDEX                             1
-- ALTER TABLE                             18
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           0
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          0
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0
