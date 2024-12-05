--CASO 1
create table RESUMEN_POR_PAIS as 
SELECT
    initcap(pa.nompais) as PAIS_ORIGEN,
    initcap(um.descripcion) as UNIDAD,
    COUNT(pr.codproducto) as CANTIDAD
FROM pais pa JOIN producto pr ON (pa.codpais = pr.codpais)
             JOIN unidad_medida um ON (um.codunidad = pr.codunidad)
WHERE pr.totalstock > pr.stkseguridad+30
GROUP BY pa.nompais, um.descripcion
HAVING count(pr.codproducto) <= (SELECT 
                                    round(avg(nvl((count(pr.codproducto)),0))) --EL PROMEDIO DA 4
                                 FROM producto pr RIGHT JOIN pais pa on (pr.codpais = pa.codpais)
                                 GROUP BY pa.nompais
                                 )
ORDER BY 1,3 desc;
/*
SELECT 
    round(avg(nvl((count(pr.codproducto)),0))) 
FROM producto pr RIGHT JOIN pais pa on (pr.codpais = pa.codpais)
GROUP BY pa.nompais;
*/
insert into pais values (10,'AUSTRALIA');
insert into pais values (13,'AUSTRIA');
insert into pais values (15,'ARGELIA');
insert into pais values (16,'BOLIVIA');
insert into pais values (17,'PARAGUAY');
COMMIT;
--ROLLBACK;
/*
Según su criterio, cambiará mucho el reporte, o el promedio que 
Ud calculó, si se ejecutan las siguientes instrucciones INSERTs. ¿Cuál sería el nuevo promedio?.

R:El reporte cambia de forma minima, las instrucciones INSERTs provocan que chile salga de este,
provocando que los paises pasaran de 7 a 6 en la lista y el promedio de los paises que no enviaron
nada pasan de 4 a 2
*/

--CASO 2 ----------------------------------------------------------------------------------
CREATE TABLE RESUMEN_CARGA AS
SELECT 
    to_char(nvl(cl.fecha_carga,SYSDATE),'MM-YYYY') as CARGADO,
    nvl(lpad(cl.telefono,11,0),'Desconocido') as FONO,
    nvl(upper(cl.mail),'No/Aplica') as "E-MAIL",
    nvl(bo.total,'0') as MONTO_TOTAL,
    nvl(upper(ba.descripcion),'Sin Datos') as BANCO
FROM boleta bo JOIN cliente cl ON (bo.rutcliente = cl.rutcliente)
               JOIN banco ba ON (ba.codbanco = bo.codbanco) 
               RIGHT JOIN comuna co ON (co.codcomuna = cl.codcomuna)
ORDER BY cargado, monto_total;

/*
¿Por qué cree que es importante determinar y corregir problemas 
de carga de datos en un sistema con Base de Datos relacionales?

R: En general siempre es importante resolver un problema de carga
en una base de datos, independiente cual sea. El porque, se podría 
explicar de distintas manera, algunas serian , el flujo de información 
entre tablas, evitar caída de sistema por sobre población de dato,
esto se reduciría haciendo que los datos no sean repetitivos, ya que todo 
esto hace que la base de dato sea lo mas liviana posible.

¿Qué concepto de SQL utilizó para determinar las comunas o bancos donde 
no hubo movimientos (compra/venta con boleta) en el período indicado? ¿Por qué no 
sirve utilizar sólo el concepto de join interno?

R:Se utiliza el contepto de OUTER JOIN, porque se debe incluir todo los datos
requeridos de una tabla, que en este caso son de comuna, agregandole que en nuestro codigo 
se le debe agregar el concepto RIGHT JOIN para que esta tenga incluidas las comunas con 
informacion de las comunas que no tengan registrado un cliente en algun banco. Si hubieramos 
aplicado INNER JOIN en comuna, esto haria que no se muestren todos los datos requeridos.
*/

--CASO 3.1
SELECT to_char(substr(v.rutvendedor, 1, length(v.rutvendedor)-2 ),'09G999G999')||'-'||substr(v.rutvendedor,-1) as RUT_VENDEDOR,
       initcap(v.nombre) as VENDEDOR,
       upper(v.direccion) as DIRECCIÓN,
       upper(c.descripcion) as COMUNA ,
       v.sueldo_base as SUELDO_BASE,
       round(v.sueldo_base*(nvl(v.comision,'0')+rs.porc_honorario)) as INCREMENTO_CON_COMISION,
       to_char(round(v.sueldo_base)+round(v.sueldo_base*(nvl(v.comision,'0')+rs.porc_honorario)),'$9G999G999') as A_PAGAR,
       case
            when v.sueldo_base+ROUND(v.sueldo_base*(NVL(v.comision,'0')+rs.porc_honorario)) > 800000 then 'Alto'
            when v.sueldo_base+ROUND(v.sueldo_base*(NVL(v.comision,'0')+rs.porc_honorario)) between 350000 and 800000 then 'Medio'
            when v.sueldo_base+ROUND(v.sueldo_base*(NVL(v.comision,'0')+rs.porc_honorario)) < 350.000 then 'Minimo'
       end as RANGO
       --multiplicando x2 daba un resultado distinto
FROM vendedor v JOIN comuna c ON (v.codcomuna = c.codcomuna)
                JOIN rangos_sueldos rs ON (v.sueldo_base between rs.sueldo_min and rs.sueldo_max)
ORDER BY a_pagar desc; 


--SELECT * FROM rangos_sueldos;


/*
Cuál es la información significativa que necesita para resolver el problema:

R: El modelo relacional que esta mostrado en el anexo, porque ahi estan los tipos de conexiones entre tablas 
para saber donde se encuentra la info que necesitamos, al mismo tiempo saber que tipo de join aplicar (en el 
caso de rangos_sueldos) y saber el camino que recorren los datos (hacer un join directo o indirecto)

Según su criterio, ¿existe alguna posibilidad de resolver el caso utilizando operadores SET?.  
R: Como grupo creemos que no, ya que no pide algun tipo de filtro de informacion entre tablas que sea dinamico al nivel de 
necesitar algun tipo de subquery de apoyo. Quizas hacer algo con la tabla de rangos_sueldos, pero en este ejercicio no es 
necesario porque a nuestro parecer es mucho mas optimo hacer un nonequijoin
*/

--CASO 3.2
SELECT 
    ve.sueldo_base+round(ve.sueldo_base*(nvl(ve.comision,0)+rs.porc_honorario)) as "SUELDO REAJUSTADO(A PAGAR)"
FROM vendedor ve JOIN rangos_sueldos rs ON (ve.sueldo_base between rs.sueldo_min and rs.sueldo_max);

UPDATE vendedor SET sueldo_reajustado = nvl((select vendedor.sueldo_base+round(vendedor.sueldo_base*(nvl(vendedor.comision,0)+rangos_sueldos.porc_honorario))
                                             from rangos_sueldos 
                                             where (vendedor.sueldo_base between rangos_sueldos.sueldo_min and rangos_sueldos.sueldo_max)), 0);
                                            /*Al parecer tambien se puede hacer con row_number, pero no pudimos aplicarlo, investigando un poco mas, 
                                              descubirmos que tambien podemos manejar las tablas como si fueran clases en java, esto facilito un poco
                                              mas el proceso */ 
/*
SELECT  *
FROM vendedor;
*/

--ROLLBACK;

COMMIT; 
/*


*/

