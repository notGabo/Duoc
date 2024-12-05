--CASO 5
select 
    t.tituloid as "CODIGO DEL LIBRO",
    t.titulo as NOMBRE,
    a.nombre ||' '||a.apellidos as AUTOR,
    e.descripcion as EDITORIAL,
    count(prestamoid) AS "TOTAL DE VECES SOLICITADO",
    case
        when count(prestamoid) = 1 then 'No se requiere comprar '
        when count(prestamoid) in(2,3) then 'Se requiere comprar 1 '
        when count(prestamoid) in(4,5) then 'Se requiere comprar 2 '
        when count(prestamoid) > 5 then 'Se requiere comprar 4 '
        else 'No se requiere comprar '
    end || 'nuevo(s) ejemplar(es)' as SUGERENCIA
from prestamo P right outer join titulo T on (p.tituloid = t.tituloid and --iguala id (pk=fk)
                                              extract(year from fecha_ini_prestamo) = extract(year from sysdate)-1) --solo toma en cuenta los prestamos que ocurrieron el año pasado, en este caso el 2020, pero de aca al otro año sera el 2021
                            join autor A on (a.tituloid=t.tituloid)
                            join editorial E on (e.editorialid=t.editorialid)
group by t.tituloid ,t.titulo,a.nombre,a.apellidos,e.descripcion
order by 5 desc,1;