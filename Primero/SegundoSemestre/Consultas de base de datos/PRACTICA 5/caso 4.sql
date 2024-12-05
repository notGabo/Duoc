--caso 4
SELECT 
    es.id_escolaridad as ESCOLARIDAD,
    es.desc_escolaridad as "DESCRIPCIÓN DE ESCOLARIDAD",
    count(em.run_emp) as "TOTAL DE EMPLEADOS",
    nvl(to_char(max(em.salario),'$9g999g999'),'$0') as "SALARIO MAXIMO",
    nvl(to_char(min(em.salario),'$9g999g999'),'$0') as "SALARIO MINIMO",
    nvl(to_char(sum(em.salario),'$9g999g999'),'$0') as "SALARIO TOTAL",
    nvl(to_char(TRUNC(AVG(em.salario)),'$9g999g999'),'$0') as "SALARIO PROMEDIO"
FROM empleado em right outer join escolaridad_emp es
on (em.id_escolaridad = es.id_escolaridad) -- condicion de union es fk=pk de id escolaridad
GROUP BY es.id_escolaridad, es.desc_escolaridad
ORDER BY 3 desc;

--caso 6

SELECT

