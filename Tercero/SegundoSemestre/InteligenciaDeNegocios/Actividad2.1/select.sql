--producto
--detalleventa
--clientes
--vendedor
--sucursal
--canal

CREATE TABLE DimProducto(
	codigo_producto NVARCHAR(255) PRIMARY KEY,
	nombre NVARCHAR(255),
	familia NVARCHAR(255)
);

CREATE TABLE DimDetalleVenta(
	documento NVARCHAR(255) PRIMARY KEY,
	precio_unitario INT,
	cantidad INT,
	total INT
);

CREATE TABLE DimClientes(
	id_cliente NVARCHAR(255) PRIMARY KEY,
	nombre NVARCHAR(255),
	apellido NVARCHAR(255),
	edad SMALLINT,
	residencia NVARCHAR(255)
);

CREATE TABLE DimVendedor(
	id_vendedor SMALLINT PRIMARY KEY,
	nombre NVARCHAR(255),
	apellido NVARCHAR(255)
);

CREATE TABLE DimSucursal(
	sucursal_id SMALLINT PRIMARY KEY,
	nombre_sucursal NVARCHAR(255),
	ciudad_comuna NVARCHAR(255),
	provincia NVARCHAR(255),
	region NVARCHAR(255)
);

CREATE TABLE DimCanal(
	canal_id INT PRIMARY KEY,
	Canal NCHAR(20)
);


CREATE TABLE FactVentas(
	codigo_producto NVARCHAR(255),
	documento NVARCHAR(255),
	id_cliente NVARCHAR(255),
	id_vendedor SMALLINT,
	sucursal_id SMALLINT,
	canal_id INT,
	fecha DATETIME,
	tipo_documento NVARCHAR(255),
	total_neto INT,
	impuesto INT,
	total_documento INT,
	CONSTRAINT FK1 FOREIGN KEY (codigo_producto) REFERENCES DimProducto(codigo_producto),
	CONSTRAINT FK2 FOREIGN KEY (documento) REFERENCES DimDetalleVenta(documento),
	CONSTRAINT FK3 FOREIGN KEY (id_cliente) REFERENCES DimClientes(id_cliente),
	CONSTRAINT FK4 FOREIGN KEY (id_vendedor) REFERENCES DimVendedor(id_vendedor),
	CONSTRAINT FK5 FOREIGN KEY (sucursal_id) REFERENCES DimSucursal(sucursal_id),
	CONSTRAINT FK6 FOREIGN KEY (canal_id) REFERENCES DimCanal(canal_id)
);