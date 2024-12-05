--Caso 1 clinica ketekura
SELECT 
    u.nombre as "NOMBRE",
    trim(m.pnombre)||' '||trim(m.apaterno)||' '||trim(m.amaterno) as "MEDICO",
    substr(u.nombre,1,2)||substr(m.apaterno,-3,2)||substr(m.telefono,1,3)||extract(year from m.fecha_contrato)||'@medicocktk.cl' as "CORREO MEDICO",
    count(a.ate_id) as "ATENCIONES MEDICAS"
FROM medico m join unidad u on(m.uni_id = u.uni_id)
              left join atencion a on(m.med_rut = a.med_rut and extract(year from fecha_atencion) = extract(year from sysdate)-1) --Condicion compuesta
group by u.nombre, m.pnombre, m.apaterno, m.amaterno, m.telefono, m.fecha_contrato
having count(a.ate_id) < (select max(count(ate_id))
                          from atencion
                          where extract(year from fecha_atencion) = extract(year from sysdate)-1
                          group by med_rut)
order by u.nombre, m.apaterno;

--Caso 3
--subquery
SELECT 
    sum(count(ate_id)) / extract(day from last_day(add_months(sysdate,-1)))    
FROM atencion
where extract(month from fecha_atencion)=extract(month from add_months(sysdate,-1)) and 
      extract(year from fecha_atencion)=extract(year from add_months(sysdate,-1))
group by fecha_atencion;

--query principal
SELECT 
    t.descripcion ||','|| s.descripcion as "SISTEMA DE SALUD",
    count(a.ate_id)
FROM salud s join tipo_salud t on (s.tipo_sal_id = t.tipo_sal_id)
             join paciente P on (s.sal_id = p.sal_id)
             join atencion A on (a.pac_rut = p.pac_rut)
where extract(month from a.fecha_atencion)=extract(month from add_months(sysdate,-1)) and 
      extract(year from fecha_atencion)=extract(year from add_months(sysdate,-1))
group by t.descripcion, s.descripcion
having count(a.ate_id) > (  
                            SELECT 
                                sum(count(ate_id)) / extract(day from last_day(add_months(sysdate,-1)))    
                            FROM atencion
                            where extract(month from fecha_atencion)=extract(month from add_months(sysdate,-1)) and 
                                  extract(year from fecha_atencion)=extract(year from add_months(sysdate,-1))
                            group by fecha_atencion);
         
                        
--caso xd
select 
       pac_rut, 
       apaterno,
       trunc(months_between(sysdate,fecha_nacimiento)/12) as edad,
       pc.porcentaje_descto,
       p.sal_id,
       (s.costo_pago - pc.porcentaje_descto)/100
from paciente P join porc_descto_3ra_edad PC on (TRUNC(MONTHS_BETWEEN(SYSDATE,FECHA_NACIMIENTO)/12) BETWEEN PC.ANNO_INI AND PC.ANNO_TER)
                join salud S on (p.sal_id = s.sal_id);
    