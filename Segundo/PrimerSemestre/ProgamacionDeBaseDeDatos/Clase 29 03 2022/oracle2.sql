var vb_numrun number;

declare
  v_nro_cliente cliente.nro_cliente%type;
  v_dvrun cliente.dvrun%type;
  v_nombre cliente_todosuma.nombre_cliente%type;
  v_run cliente_todosuma.run_cliente%type;
  v_nombre_tipo_cliente tipo_cliente.nombre_tipo_cliente%type;
  v_suma_monto_solicitado number;
begin
  SELECT a.nro_cliente, a.dvrun, a.pnombre || ' ' || a.snombre || ' ' ||
    appaterno || ' ' || apmaterno, nombre_tipo_cliente,
    sum(monto_solicitado)
  INTO v_nro_cliente, v_dvrun, v_nombre, v_nombre_tipo_cliente
  FROM cliente a join tipo_cliente b 
    on (a.cod_tipo_cliente = b.cod_tipo_cliente)
    join credito_cliente c on (a.nro_cliente = c.nro_cliente)
  where numrun = :vb_numrun and
    to_char(c.fecha_solic_cred,'yyyy') = (to_char(sysdate,'yyyy')-1);
  v_run:=to_char(:vb_numrun,'99g999g999') || '-' || v_dvrun;
  group by 
  dbms_output.put_line(v_nro_cliente || ' ' || v_run || ' ' || v_nombre ||
  ' ' || v_nombre_tipo_cliente);
end;

