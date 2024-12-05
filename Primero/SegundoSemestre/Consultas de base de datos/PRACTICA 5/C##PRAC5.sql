/*
Guia 5
Funciones de estadisticas       

*/
--caso 1
SELECT 
carreraid as "IDENTIFICACION DE LA CARRERA",
COUNT(alumnoid) as "TOTAL ALUMNOS MATRICULADOS" ,
'Le corresponden ' || to_char(COUNT(alumnoid)*&MONTO,'$999g999')|| ' del prespuesto total asignado para publicidad' AS "MONTO POR PUBLICIDAD"
FROM alumno
group by carreraid
having COUNT(alumnoid)>4
order by 2 DESC,1;