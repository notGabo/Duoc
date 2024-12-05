    var vb_utilidad number; --utilidad $200000000
    var vb_porce_util number; -- porcentaje util 30%
    var vb_tramo_min_1 number; 
    var vb_tramo_max_1 number;
    var vb_tramo_min_2 number;
    var vb_tramo_max_2 number;
    var vb_tramo_min_3 number;
    var vb_tramo_max_3 number;
    var vb_tramo_min_4 number;
    var vb_tramo_max_4 number;
    var vb_tramo_min_5 number;
    var vb_tramo_max_5 number;
    var vb_porce_tramo_1 number;
    var vb_porce_tramo_2 number;
    var vb_porce_tramo_3 number;
    var vb_porce_tramo_4 number;
    var vb_porce_tramo_5 number;
    
    
    declare
        v_id_emp empleado.id_emp%type:=100;
        v_sueldo_base empleado.sueldo_base%type; 
        v_util_a_repartir number;
        v_util_a_repartir_t1 number;
        v_util_a_repartir_t2 number;
        v_util_a_repartir_t3 number;
        v_util_a_repartir_t4 number;
        v_util_a_repartir_t5 number;
        v_cant_t1 number;
        v_cant_t2 number;
        v_cant_t3 number;
        v_cant_t4 number;
        v_cant_t5 number;
        
    begin
        v_util_a_repartir:=round(vb_utilidad * vb_porce_util / 100);
        v_util_a_repartir_t1:=round(v_util_a_repartir*v_porce_tramo_1/100);
        v_util_a_repartir_t2:=round(v_util_a_repartir*v_porce_tramo_2/100);
        v_util_a_repartir_t3:=round(v_util_a_repartir*v_porce_tramo_3/100);
        v_util_a_repartir_t4:=round(v_util_a_repartir*v_porce_tramo_4/100);
        v_util_a_repartir_t5:=round(v_util_a_repartir*v_porce_tramo_5/100);
        
        select count(*)
        into v_cant_t1
        from empleado
        where sueldo_base between :vb_tramo_min_1 and :vb_tramo_max_1;
        select count(*)
        into v_cant_t2
        from empleado
        where sueldo_base between :vb_tramo_min_2 and :vb_tramo_max_2;
        select count(*)
        into v_cant_t3
        from empleado
        where sueldo_base between :vb_tramo_min_3 and :vb_tramo_max_3;
        select count(*)
        into v_cant_t4
        from empleado
        where sueldo_base between :vb_tramo_min_4 and :vb_tramo_max_4;
        select count(*)
        into v_cant_t5
        from empleado
        where sueldo_base between :vb_tramo_min_5 and :vb_tramo_max_5;
        
        while v_id_emp <=320 loop
            select sueldo_base
            into v_sueldo_base
            from empleado
            where id_emp=v_id_emp;
            if v_sueldo_base between :vb_tramo_min_1 and :vb_tramo_max_1 then v_util_emp:=round(v_util_a_repartir_t1 / v_cant_t1);
            if v_sueldo_base between :vb_tramo_min_2 and :vb_tramo_max_2 then v_util_emp:=round(v_util_a_repartir_t2 / v_cant_t2);
            if v_sueldo_base between :vb_tramo_min_3 and :vb_tramo_max_3 then v_util_emp:=round(v_util_a_repartir_t3 / v_cant_t3);
            if v_sueldo_base between :vb_tramo_min_4 and :vb_tramo_max_4 then v_util_emp:=round(v_util_a_repartir_t4 / v_cant_t4);
            if v_sueldo_base between :vb_tramo_min_5 and :vb_tramo_max_5 then v_util_emp:=round(v_util_a_repartir_t5 / v_cant_t5);
            dbms_output.put_line(v_id_emp || ' ' || v_sueldo_base);
            v_id_emp:= v_id_emp+10;
        end loop;
    end;