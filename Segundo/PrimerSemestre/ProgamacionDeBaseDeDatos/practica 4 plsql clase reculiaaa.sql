var vb_anno_proceso number;

var vb_comuna_1 varchar2;
var vb_comuna_2 varchar2;
var vb_comuna_3 varchar2;
var vb_comuna_4 varchar2;
var vb_comuna_5 varchar2;

var vb_valor_comuna_1 number;
var vb_valor_comuna_2 number;
var vb_valor_comuna_3 number;
var vb_valor_comuna_4 number;
var vb_valor_comuna_5 number;

declare
    v_id_emp empleado.id_emp%type:=100;
    v_numrun_emp empleado.numrun_emp%type;
    v_dvrun_emp empleado.dvrun_emp%type;
    v_nombre_empleado proy_movilizacion.nombre_empleado%type;
    v_nombre_comuna comuna.nombre_comuna%type;
    v_sueldo_base empleado.sueldo_base%type;
    v_porce_normal number;
    v_valor_normal number;
    v_valor_extra number;
    
begin
    execute immediate 'truncate table proy_movilizacion';
    while v_id_emp <=320 loop
        select numrun_emp, dvrun_emp, pnombre_emp || ' ' || snombre_emp || ' ' ||
            appaterno_emp || ' ' || apmaterno_emp, nombre_comuna, sueldo_base
        into v_numrun_emp, v_dvrun_emp, v_nombre_empleado, v_nombre_comuna, v_sueldo_base
        from empleado a join comuna b on(a.id_comuna = b.id_comuna)
        where id_emp = v_id_emp;
        p_porce_normal:= trunc(v_sueldo_base / 10000);
        v_valor_normal:=round(v_sueldo_base * v_porce_normal / 100);
        v_valor_extra:=
            case v_nombre_comuna
                when :vb_comuna_1 then:vb_valor_comuna_1
                when :vb_comuna_2 then:vb_valor_comuna_2
                when :vb_comuna_3 then:vb_valor_comuna_3
                when :vb_comuna_4 then:vb_valor_comuna_4
                when :vb_comuna_5 then:vb_valor_comuna_5
                else 0
            end;
        insert into proy_movilizacion values (:vb_anno_proceso, v_id_emp, v_numrun_emp, v_dvrun_emp, v_nombre_empleado,v_nombre_comuna, v_sueldo_base,
                    v_porce_normal, v_valor_normal, v_valor_extra, v_valor_normal+v_valor_extra);
        DBMS_OUTPUT.PUT_LINE(v_id_emp || ' ' || v_sueldo_base || ' ' || v_valor_normal|| ' ' || v_valor_extra);
        v_id_emp:=v_id_emp + 10;
    end loop;
end;