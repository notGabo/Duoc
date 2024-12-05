-- Insertar regiones sucursales
insert into dbo.DimREGIONSUCURSAL (NOMBRE_REGION) VALUES ('Valparaiso'),('Metropolitana'),('Metropolitana');
-- -- Insertar codigos postales sucursales
insert into dbo.DimCODIGOPOSTALSUCURSAL (CODIGO_POSTAL) VALUES (2520000),(7550000),(8420000);
-- -- Insertar calles sucursales
insert into dbo.DimCALLESUCURSAL (NOMBRE_CALLE) VALUES ('Calle Vina del mar'), ('Avenida Manquehue'),('San diego')
-- -- Insertar comunas sucursales
insert into dbo.DimCOMUNASUCURSAL (NOMBRE_COMUNA) VALUES ('Vina del mar'), ('Las condes'), ('Santiago')
-- -- Insertar ciudades sucursales
insert into dbo.DimCIUDADSUCURSAL (NOMBRE_CIUDAD_SUCURSAL) VALUES ('Vina del mar'),('Santiago'),('Santiago')


