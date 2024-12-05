select 
    ventas.id_vendedor,
    VENDEDORES.Nombre,
    vendedores.Apellido,
    count(ventas.id_vendedor) as ventas
from ventas
join vendedores on vendedores.ID_VENDEDOR = ventas.ID_VENDEDOR
group by ventas.id_vendedor
order by ventas.id_vendedor asc 
