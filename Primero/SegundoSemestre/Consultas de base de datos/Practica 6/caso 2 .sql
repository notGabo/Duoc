/*
SELECT
FROM [JOINS{INNER JOIN, OUTER JOIN }]
WHERE
GROUP BY [MIN, MAX, ETC]
HAVING
ORDER BY
*/

--CASO 2
SELECT 
    to_char(c.numrun,'09G999G999')||'-'||upper(c.dvrun) as "RUN CLIENTE",
    upper(trim(c.pnombre))||' '||upper(trim(c.snombre))||' '||upper(trim(c.appaterno))||' '||upper(trim(c.apmaterno)) as "NOMBRE CLIENTE",
    lpad(to_char(sum(cc.monto_solicitado),'$9g999g999'),21) as "MONTO SOLICITADO CREDITOS",
    lpad(to_char(sum(cc.monto_solicitado)*0.012,'$9G999G999'),19) as "TOTAL DE PESOS TODO SUMA"
    FROM cliente c JOIN credito_cliente CC 
                   on (c.nro_cliente = cc.nro_cliente)
WHERE extract(year from cc.fecha_otorga_cred)= extract (year from add_months(sysdate,-12))
group by c.numrun, c.dvrun, c.pnombre, c.snombre, c.appaterno, c.apmaterno
ORDER BY 4 ,c.appaterno;

--CASO 5
SELECT
        to_number(to_char(sysdate,'YYYY')) as "AÑO TRIBUTARIO",
        to_char(c.numrun,'09G999G999')||'-'||c.dvrun as "RUN CLIENTE",
        initcap(trim(c.pnombre))||' '||initcap(trim(substr(c.snombre,1,1)))||'. '||initcap(c.appaterno)||' '||initcap(c.apmaterno) as "NOMBRE CLIENTE",
        count(p.cod_prod_inv) as "TOTAL PROD. INV AFECTOS IMPTO",
        to_char(sum(monto_total_ahorrado),'$99G999G999') AS "MONTO TOTAL AHORRADO"
FROM CLIENTE C JOIN PRODUCTO_INVERSION_CLIENTE P ON (C.NRO_CLIENTE = P.NRO_CLIENTE)
where --extract(year from p.fecha_solic_prod) = extract(year from sysdate) AND 
      p.cod_prod_inv in (30, 35 , 40, 45, 50, 55)
GROUP BY to_number(to_char(sysdate,'YYYY')),c.numrun, c.dvrun, c.pnombre, c.snombre, c.appaterno, c.apmaterno
order by c.appaterno;

--caso 4
select 
TO_CHAR(c.numrun,'99G999G999')|| '-' ||UPPER(c.dvrun) AS "RUN CLIENTE",
UPPER(c.pnombre||' '||c.snombre||' '||c.appaterno||' '||c.apmaterno) AS "NOMBRE CLIENTE",
TO_CHAR(p.monto_total_ahorrado, '$999G999G999') AS "MONTO TOTAL AHORRADO", 
 CASE
    WHEN p.monto_total_ahorrado BETWEEN 100000  AND 1000000 THEN 'BRONCE'
    WHEN p.monto_total_ahorrado BETWEEN 1000001  AND 4000000 THEN 'PLATA'
    WHEN p.monto_total_ahorrado BETWEEN 4000001  AND 8000000 THEN 'SILVER'
    WHEN p.monto_total_ahorrado BETWEEN 8000001  AND 15000000 THEN 'GOLD'
    WHEN p.monto_total_ahorrado > 15000000 THEN 'PLATINUM' 
END AS "CATEGORIZACIÓN DEL CLIENTE"
FROM cliente C JOIN producto_inversion_cliente  P ON (c.nro_cliente = p.nro_cliente)
where
ORDER BY c.appaterno,p.monto_total_ahorrado DESC;

