--
SELECT 
    lower(es.nombre) "ESPECIALIDAD",
    TO_CHAR(me.med_rut,'09G999G999')||'-'||me.dv_rut "RUT",
    upper(me.pnombre||' '||me.snombre||' '||me.apaterno||' '||me.amaterno) "MEDICO"
    --count(at.ate_id) as "ID ATENCION"
FROM medico me left outer join especialidad_medico em on (me.med_rut = em.med_rut)
               join especialidad es on (em.esp_id = es.esp_id)
               left outer join atencion at on (em.esp_id = at.esp_id AND em.med_rut = at.med_rut AND extract(year from at.fecha_atencion) = extract (year from add_months(sysdate,-12)))
               --Incluye todas las especialidades medicas vinculadas a un doctor
               
--WHERE extract(year from at.fecha_atencion) = extract (year from add_months(sysdate,-12))
GROUP BY es.nombre, me.med_rut, me.dv_rut, me.pnombre, me.snombre, me.apaterno, me.amaterno
HAVING count(at.ate_id) < 10
ORDER BY 1, me.apaterno;