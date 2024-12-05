---------------------------------- CASO 1 ----------------------------------
CREATE OR REPLACE TRIGGER TGR_A
AFTER INSERT OR UPDATE OR DELETE ON consumo
FOR EACH ROW
BEGIN
    IF INSERTING THEN
        UPDATE total_consumos
            SET monto_consumos = monto_consumos + :NEW.monto
            WHERE id_huesped = :NEW.id_huesped;
    ELSIF UPDATING THEN
        UPDATE total_consumos
            SET monto_consumos = (monto_consumos - :OLD.monto) + :NEW.monto
            WHERE id_huesped = :NEW.id_huesped;
    ELSE
        UPDATE total_consumos
            SET monto_consumos = monto_consumos - :OLD.monto
            WHERE id_huesped = :OLD.id_huesped;
    END IF;
END;


INSERT INTO consumo
VALUES(11527, 1587, 340039, 100);

DELETE consumo WHERE id_consumo = 10417;

UPDATE consumo SET monto = 56 WHERE id_consumo = 10901;
UPDATE consumo SET monto = 80 WHERE id_consumo = 11214;

COMMIT;

-- POR SI ACASO jsjs
DROP TRIGGER TGR_A;

----------------------------------------

--ROLLBACK MANUAL O FORMATEO DE LOS DATOS
DELETE consumo WHERE id_consumo = 11527;

INSERT INTO consumo
VALUES(10417, 1361, 340036, 102);

UPDATE consumo SET monto = 40 WHERE id_consumo = 10901;
UPDATE consumo SET monto = 95 WHERE id_consumo = 11214;

UPDATE total_consumos SET monto_consumos = 285 WHERE id_huesped = 340036;
UPDATE total_consumos SET monto_consumos = 95 WHERE id_huesped = 340038;
UPDATE total_consumos SET monto_consumos = 95 WHERE id_huesped = 340039;
UPDATE total_consumos SET monto_consumos = 273 WHERE id_huesped = 340043;

COMMIT;


----------------------------------CASO 2----------------------------------
-- 1
CREATE OR REPLACE PACKAGE pk_A AS
    FUNCTION fn_conversor_monto_tours (p_id_huesped NUMBER) RETURN NUMBER;
    vp_valor_dolar NUMBER := 840;
END;

CREATE OR REPLACE PACKAGE BODY pk_A AS
    FUNCTION fn_conversor_monto_tours (p_id_huesped NUMBER) RETURN NUMBER IS
    v_resultado NUMBER;
    BEGIN
        SELECT
            NVL(SUM(b.valor_tour * a.num_personas), 0)
        INTO
            v_resultado
        FROM
            huesped_tour a JOIN tour b
            ON(a.id_tour = b.id_tour)
        WHERE a.id_huesped = p_id_huesped;
        
        RETURN v_resultado;
    END;
END;

-- FUNCION PROPIA PARA CALCULAR EL DESCUENTO ESPECIAL O DE SUERTE
CREATE OR REPLACE FUNCTION fn_calculo_suerte(p_id_huesped NUMBER, p_suerte CHAR, p_subtotal NUMBER) RETURN NUMBER AS
v_inicial CHAR;
v_resultado NUMBER;
BEGIN
    SELECT SUBSTR(UPPER(LTRIM(appat_huesped)), 0, 1)
    INTO v_inicial
    FROM huesped
    WHERE id_huesped = p_id_huesped;

    IF v_inicial = p_suerte THEN
        v_resultado := p_subtotal * 0.1;
    ELSE
        v_resultado := 0;
    END IF;
    RETURN v_resultado;
END;

--2
CREATE OR REPLACE FUNCTION fn_consumos_huesped (p_id_huesped NUMBER) RETURN NUMBER AS
    v_resultado NUMBER;
    v_mensaje_error VARCHAR2(250);
    v_rutina_error VARCHAR2(250);
    v_id_error NUMBER;
BEGIN
    SELECT NVL(MAX(id_error),0) + 1
    INTO v_id_error 
    FROM reg_errores;

    EXECUTE IMMEDIATE 'SELECT NVL(monto_consumos, 0) FROM total_consumos WHERE id_huesped = '|| p_id_huesped
    INTO v_resultado;
    RETURN v_resultado;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
    v_mensaje_error := SQLERRM;
    v_rutina_error := 'Error en la funcion fn_consumos_huesped al recuperar los consumos del cliente con Id '|| p_id_huesped;
    INSERT INTO reg_errores
           VALUES(v_id_error, v_rutina_error, v_mensaje_error);
    RETURN 0;
END fn_consumos_huesped;

--3
CREATE OR REPLACE PROCEDURE prc_principal (p_fecha_ingr VARCHAR2, p_suerte CHAR) AS

v_valor_alojamiento NUMBER;
v_valor_consumo NUMBER;
v_valor_tour NUMBER;
v_valor_subtotal NUMBER;

v_valor_descuento_consumo NUMBER;
v_valor_descuento_suerte NUMBER;

v_valor_total NUMBER;

v_valor_dolar NUMBER := pk_a.vp_valor_dolar;

CURSOR cur_huesped IS
    SELECT *
    FROM huesped;

CURSOR cur_valor_alojamiento(p_id_huesped NUMBER) IS
    SELECT 
        SUM( c.valor_habitacion + c.valor_minibar) * a.estadia AS ALOJAMIENTO
    FROM
        reserva a 
        JOIN detalle_reserva b
            ON(a.id_reserva = b.id_reserva)
        JOIN habitacion c
            ON(c.id_habitacion = b.id_habitacion)
    WHERE
        TO_CHAR(a.ingreso, 'yyyymm') = p_fecha_ingr AND a.id_huesped = p_id_huesped
    GROUP BY a.estadia;

CURSOR cur_tramos_consumos IS
        SELECT vmin_tramo, vmax_tramo, pct
        FROM tramos_consumos;

BEGIN
    EXECUTE IMMEDIATE 'TRUNCATE TABLE detalle_diario_huespedes';
    EXECUTE IMMEDIATE 'TRUNCATE TABLE reg_errores';
    
    FOR i_huesped IN cur_huesped LOOP
    
    -- RESETEA VARIABLES EN 0
        v_valor_alojamiento := 0;
        v_valor_consumo := 0;
        v_valor_tour := 0;
        v_valor_subtotal := 0;

        v_valor_descuento_consumo := 0;
        v_valor_descuento_suerte := 0;

        v_valor_total := 0;

        -- CALCULO DE ALOJAMIENTO
        FOR i_alojamiento IN cur_valor_alojamiento(i_huesped.id_huesped) LOOP
            v_valor_alojamiento := i_alojamiento.alojamiento;
        END LOOP;

        v_valor_consumo := fn_consumos_huesped(i_huesped.id_huesped);
        v_valor_tour := pk_a.fn_conversor_monto_tours(i_huesped.id_huesped);
        v_valor_subtotal := v_valor_alojamiento + v_valor_consumo + v_valor_tour;

        -- CALCULO DE DESCUENTO CONSUMO
        FOR i_tramos IN cur_tramos_consumos LOOP
            IF v_valor_consumo BETWEEN i_tramos.vmin_tramo AND i_tramos.vmax_tramo THEN 
                v_valor_descuento_consumo := ROUND(v_valor_consumo * i_tramos.pct);
            END IF;
        END LOOP;

        v_valor_descuento_suerte := fn_calculo_suerte(i_huesped.id_huesped, p_suerte, v_valor_subtotal);


        v_valor_total := v_valor_subtotal - v_valor_descuento_consumo - v_valor_descuento_suerte;

        -- CONVERSION A DOLARES
        v_valor_alojamiento := ROUND(v_valor_alojamiento * v_valor_dolar);
        v_valor_consumo := ROUND(v_valor_consumo * v_valor_dolar);
        v_valor_tour := ROUND(v_valor_tour * v_valor_dolar);
        v_valor_subtotal := ROUND(v_valor_subtotal * v_valor_dolar);

        v_valor_descuento_consumo := v_valor_descuento_consumo * v_valor_dolar;
        v_valor_descuento_suerte := ROUND(v_valor_descuento_suerte * v_valor_dolar);

        v_valor_total := ROUND(v_valor_total * v_valor_dolar);

        INSERT INTO detalle_diario_huespedes
        VALUES (i_huesped.id_huesped,
                i_huesped.appat_huesped ||' '|| i_huesped.apmat_huesped ||' '|| i_huesped.nom_huesped,
                v_valor_alojamiento, v_valor_consumo, v_valor_tour, v_valor_subtotal,
                v_valor_descuento_consumo, v_valor_descuento_suerte, v_valor_total);

    END LOOP;
END prc_principal;

EXECUTE prc_principal('202108', 'M');