--CASO 1 ENSAYO 2
CREATE TABLE RESUMEN_OCTUBRE_2020 AS
    SELECT  
        TO_CHAR(SUBSTR(v.rutvendedor,1,LENGTH(v.rutvendedor)-2),'09G999G999') || SUBSTR(v.rutvendedor,-2) as RUT_EMP,
        c.descripcion AS COMUNA,
        v.sueldo_base AS SUELDO_BASE,
        b.fecha AS FECHA,
        rs.porc_honorario AS PORC_HONORARIO,
        ROUND(v.sueldo_base*rs.porc_honorario) AS BONIFICA_HONORARIOS,
        v.comision AS COMISION,
        ROUND(v.sueldo_base*v.comision) AS BONIFICA_COMISION,
        TO_CHAR(ROUND((v.sueldo_base*v.comision)+(v.sueldo_base*rs.porc_honorario)),'$999G999') AS TOTAL_BONOS
    FROM VENDEDOR V JOIN BOLETA B ON (v.rutvendedor = b.rutvendedor) --JOIN NATURAL
                    JOIN COMUNA C ON (c.codcomuna = v.codcomuna) --JOIN NATURAL
                    JOIN RANGOS_SUELDOS RS ON (v.sueldo_base BETWEEN rs.sueldo_min AND rs.sueldo_max) --NONE JOIN(NO ES PK A FK, YA QUE NO HAY POR DONDE UNIRSE, POR LO QUE SERA UNA FUNCION)
    WHERE c.descripcion != 'VITACURA' AND 
          EXTRACT(MONTH FROM b.fecha) = EXTRACT(MONTH FROM ADD_MONTHS(sysdate,-12)) AND
          EXTRACT(YEAR FROM b.fecha) = EXTRACT(YEAR FROM ADD_MONTHS(sysdate,-12));
          
--CASO 2 ENSAYO 2
SELECT 
    UPPER(pa.nompais) as PAIS,
    count(pr.codproducto) as CANTIDAD,
    sum(pr.vunitario) as "PRECIO x UNIDAD" 
FROM producto PR join pais PA ON (pr.codpais = pa.codpais)
                 join promocion pm on (pr.codproducto = pm.codproducto)
WHERE pr.codproducto IN (SELECT codproducto
                         FROM producto
                         WHERE vunitario > 8000
                         MINUS
                         SELECT codproducto
                         FROM producto
                         WHERE extract (year from fecha_hasta) =
                               extract (year from sysdate)-1)
GROUP BY pa.nompais
HAVING count(pr.codproducto)> (SELECT ROUND(AVG(NVL(SUM(d.cantidad),0)))
                               FROM detalle_factura D right join producto P ON (d.codproducto = p.codproducto)
                               GROUP BY p.codproducto
                                );
                                
--caso 3 ensayo 2
SELECT * FROM PAGO_VENDEDOR;

--PROCESO 1 CASO 3 (insert select)
INSERT INTO pago_vendedor
    SELECT 
        extract (month from add_months(sysdate,-1))||' '||extract (year from add_months(sysdate,-1))  AS MES_ANNO,  
        v.rutvendedor,
        upper(v.nombre) as NOMVENDEDOR,
        v.sueldo_base AS SUELDO_BASE,
        v.sueldo_base*v.comision as COMISION_MES,
        round(sum(b.total)*((5 + 3.5)/100)) as COLACION,
        round(sum(b.total)*((8 + 3.5)/100)) as MOVILIZACION,
        round(sum(b.total)*((10 + 3.5)/100)) as PREVISION,
        round(sum(b.total)*((7 + 3.5)/100)) as SALUD,
        v.sueldo_base + v.sueldo_base*v.comision + round(sum(b.total)*(5+3.5)/100) + round(sum(b.total)*(8+3.5)/100) + round(sum(b.total)*(10+3.5)/100) + round(sum(b.total)*(7+3.5)/100) as TOTAL_PAGAR 
    FROM vendedor V join boleta B on(v.rutvendedor = b.rutvendedor)
    WHERE extract(month from b.fecha) = extract(month from add_months(sysdate,-13)) and 
          extract(year from b.fecha) = extract (year from add_months(sysdate,-13))
    GROUP BY v.rutvendedor, v.nombre, v.sueldo_base, v.comision;
COMMIT;

--caso 3 proceso 2

--
SELECT 
    codproducto,
    descripcion,
    totalstock,
    stkseguridad
FROM producto;

--actualizar la columna sktseguridad de la tabla producto
UPDATE producto SET stkseguridad = stkseguridad + ROUND(stkseguridad*:REAJUSTE/100)
WHERE codproducto=4; 

--volver atras
ROLLBACK;


--
SELECT
    round(avg(nvl(totalstock,0))) --48 promedio redondeado
FROM producto;


SELECT 
    codproducto --PRODUCTOS ESTUVIERON EN PROMOCION DESDE 2018
FROM promocion
WHERE EXTRACT (YEAR FROM fecha_hasta) >=2018 --extract (year from add_months(sysdate,-12))
UNION
SELECT codproducto FROM PRODUCTO
WHERE totalstock < (SELECT
                        round(avg(nvl(totalstock,0))) 
                      FROM producto);

