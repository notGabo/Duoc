--show user;
--OWNER (13 TABLAS,dueño de otra vista, NEGOCIO FACTORY TECH S.A)
select * from tab;

--caso 6
CREATE VIEW VISTA_CLIENTES_DCTO
select a.cod_equipo,
       lpad(substr(c.rutcli,1,length(c.rutcli)-1),9) as RUT_CLI,
       substr(c.rutcli,-1) as DV,
       trim(initcap(c.nombre_completo))as NOMBRE_CLI,
       to_char(d.monto,'$999g999') as MONTO_DCTO
from cliente C join arriendo_equipos a on (c.rutcli = a.rutcli)
               join descuento d on (a.dias_solicitado between d.dias_ini and d.dias_fin)
where d.monto>0
order by 5 desc;

--caso 8 en owner
select *
from equipo eq join empleado em on (eq.rut_vend = em.rut_vend)
               join marca ma on (eq.idmarca = ma.idmarca)
where eq.color = 'Pardo';
