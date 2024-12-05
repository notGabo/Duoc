
select 
    v.sucursal_id as ID_SUCURSAL,
    dv.producto_id as ID_PRODUCTO,
    v.cliente_id as ID_CLIENTE,
    v.vendedor_id as ID_VENDEDOR,
    cast(v.fecha as date) as FECHA
from ventas as v
join detalle_ventas as dv on v.venta_id = dv.venta_id
where tipo_documento = 'boleta'