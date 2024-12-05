-- show user;  USER es "OWNER_PRUEBA3"

select * from v_clientes_por_agencia;
grant select on v_clientes_por_agencia to developer_p3;

-- ----------------------------------------------------------

select cl.nom_cliente ||' '|| cl.appat_cliente as Nombre_cliente,
        r.estadia as Dias_alojamiento,
        round(c.monto*815) as monto_en_pesos
from consumo C join cliente CL on (c.id_cliente = cl.id_cliente)
               join reserva R on (r.id_cliente = cl.id_cliente)
where round(c.monto*815)>200000;
 

