-- Insertar datos de clientes
-- Insertar regiones de clientes
INSERT INTO dbo.DimREGION_CLIENTE (NOMBRE_REGION_CLIENTE) VALUES 
('Metropolitana'),('Valparaiso'),('Metropolitana'),('Valparaiso'),('Metropolitana'),
('Valparaiso'),('Metropolitana'),('Valparaiso'),('Metropolitana'),('Valparaiso'),
('Metropolitana'),('Valparaiso'),('Metropolitana'),('Valparaiso'),('Metropolitana'),
('Valparaiso'),('Metropolitana'),('Valparaiso'),('Metropolitana'),('Valparaiso');

-- Insertar codigos postales de clientes
INSERT INTO dbo.DimCODIGOPOSTALCLIENTE (CODIGO_POSTAL_CLIENTE) VALUES 
('7500000'),('2510000'),('7500010'),('7500020'),('2520000'),
('7500030'),('7510000'),('2510010'),('7510010'),('2510020'),
('7520000'),('2520010'),('7520010'),('7520020'),('7520030'),
('7520040'),('7530000'),('7530010'),('7530020'),('7530030');

-- Insertar calles sucursales
INSERT INTO dbo.DimCALLECLIENTE (NOMBRE_CALLE_CLIENTE) VALUES 
('Alameda'),('Manquehue'),('Providencia'),('Viña del Mar'),('Franklin'),
('Nueva Providencia'),('Las Hualtatas'),('Santa Isabel'),('San Martin'),('Av. España'),
('Moneda'),('Amunátegui'),('Huérfanos'),('Esmeralda'),('Diego Portales'),
('Almirante Barroso'),('Alonso de Ercilla'),('Nataniel Cox'),('Merced'),('San Antonio');

-- Insertar comunas de clientes
INSERT INTO dbo.DimCOMUNACLIENTE (NOMBRE_COMUNA_CLIENTE) VALUES 
('Las Condes'),('Santiago'),('Viña del Mar'),('Franklin'),
('Providencia'),('Lo Barnechea'),('Ñuñoa'),('Valparaíso'),('Quinta Normal'),
('Conchalí'),('La Cisterna'),('Pudahuel'),('Macul'),('Cerro Navia'),('La Florida'),
('Recoleta'),('Quilicura'),('La Reina'),('Estación Central'),('Independencia');

-- Insertar ciudades de clientes
INSERT INTO dbo.DimCIUDADCLIENTE (NOMBRE_CIUDAD_CLIENTE) VALUES 
('Santiago'),('Valparaiso'),('Santiago'),('Valparaiso'),('Santiago'),
('Valparaiso'),('Santiago'),('Valparaiso'),('Santiago'),('Valparaiso'),
('Santiago'),('Valparaiso'),('Santiago'),('Valparaiso'),('Santiago'),
('Valparaiso'),('Santiago'),('Valparaiso'),('Santiago'),('Valparaiso');

-- Insertar datos de contacto de clientes
INSERT INTO dbo.DimCONTACTO (TELEFONO,CORREO) Values
(CAST(FLOOR(RAND() * 100000000) AS NUMERIC(8,0))+900000000, 'cliente1@example.com'),
(CAST(FLOOR(RAND() * 100000000) AS NUMERIC(8,0))+900000000, 'john.doe1@example.net'),
(CAST(FLOOR(RAND() * 100000000) AS NUMERIC(8,0))+900000000, 'alice.smith2@example.org'),
(CAST(FLOOR(RAND() * 100000000) AS NUMERIC(8,0))+900000000, 'bob.jones3@example.com'),
(CAST(FLOOR(RAND() * 100000000) AS NUMERIC(8,0))+900000000, 'emily.white4@example.net'),
(CAST(FLOOR(RAND() * 100000000) AS NUMERIC(8,0))+900000000, 'david.brown5@example.org'),
(CAST(FLOOR(RAND() * 100000000) AS NUMERIC(8,0))+900000000, 'olivia.green6@example.com'),
(CAST(FLOOR(RAND() * 100000000) AS NUMERIC(8,0))+900000000, 'jacob.taylor7@example.net'),
(CAST(FLOOR(RAND() * 100000000) AS NUMERIC(8,0))+900000000, 'emma.johnson8@example.org'),
(CAST(FLOOR(RAND() * 100000000) AS NUMERIC(8,0))+900000000, 'liam.anderson9@example.com'),
(CAST(FLOOR(RAND() * 100000000) AS NUMERIC(8,0))+900000000, 'sophia.martinez10@example.net'),
(CAST(FLOOR(RAND() * 100000000) AS NUMERIC(8,0))+900000000, 'noah.garcia11@example.org'),
(CAST(FLOOR(RAND() * 100000000) AS NUMERIC(8,0))+900000000, 'ava.rodriguez12@example.com'),
(CAST(FLOOR(RAND() * 100000000) AS NUMERIC(8,0))+900000000, 'mia.martinez13@example.net'),
(CAST(FLOOR(RAND() * 100000000) AS NUMERIC(8,0))+900000000, 'ethan.smith14@example.org'),
(CAST(FLOOR(RAND() * 100000000) AS NUMERIC(8,0))+900000000, 'isabella.johnson15@example.com'),
(CAST(FLOOR(RAND() * 100000000) AS NUMERIC(8,0))+900000000, 'aiden.white16@example.net'),
(CAST(FLOOR(RAND() * 100000000) AS NUMERIC(8,0))+900000000, 'olivia.brown17@example.org'),
(CAST(FLOOR(RAND() * 100000000) AS NUMERIC(8,0))+900000000, 'jackson.martin18@example.com'),
(CAST(FLOOR(RAND() * 100000000) AS NUMERIC(8,0))+900000000, 'sophia.jones19@example.net'),
(CAST(FLOOR(RAND() * 100000000) AS NUMERIC(8,0))+900000000, 'liam.davis20@example.org');
