CREATE TABLE categoria (
   categoria_Id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre  VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO categoria(nombre) VALUES
('bebidas'),('despensa'),('congelados'),('panaderia'),('limpieza'),
('lacteos'),('carnes'),('frutas'),('verduras'),('higiene'),('articulos Hogares');

CREATE TABLE proveedores (
    proveedor_Id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(40) NOT NULL,
    stock VARCHAR(10),
    tel VARCHAR(20),
    gmail VARCHAR(30) UNIQUE,
    precioProducto VARCHAR(30),
    empleado_Id INTEGER NOT NULL,
    producto_Id INTEGER NOT NULL,
    FOREIGN KEY(empleado_Id) REFERENCES empleados(empleado_Id) ,
    FOREIGN KEY(producto_Id) REFERENCES productos(producto_Id)
);

CREATE TABLE productos (
    producto_Id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(40) NOT NULL,
    precio INTEGER,
    stock VARCHAR(50),
    sinStock VARCHAR(45),
    fechaVencimiento VARCHAR(40),
    empleado_Id INTEGER NOT NULL,
    categoria_Id INTEGER NOT NULL,
    promo_Id INTEGER NOT NULL,
    cliente_Id INTEGER NOT NULL,
    marca_Id INTEGER NOT NULL,
    FOREIGN KEY(empleado_Id) REFERENCES empleados(empleado_Id) ,
    FOREIGN KEY(cliente_Id) REFERENCES cliente(cliente_Id),
    FOREIGN KEY(promo_Id) REFERENCES promociones(promo_Id) ,
    FOREIGN KEY(categoria_Id) REFERENCES categoria(categoria_Id),
    FOREIGN KEY(marca_Id) REFERENCES marcas(marca_Id)
);

INSERT INTO productos (nombre, precio, stock, sinStock, fechaVencimiento, 
empleado_Id, categoria_Id, promo_Id, cliente_Id, marca_Id) VALUES
('Pan Lactal Blanco Grande', '950.00', '30', 'No', '2025-06-10');

CREATE TABLE empleados (
    empleado_Id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(40) NOT NULL,
    apellido VARCHAR(50),
    puesto VARCHAR(45),
    tiempoTrabajado VARCHAR(50) UNIQUE,
    fechaVencimiento VARCHAR(40)
);

CREATE TABLE cliente (
    cliente_Id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(40) NOT NULL,
    apellido VARCHAR(50),
    dni VARCHAR(45),
    email VARCHAR(50) UNIQUE,
	empleado_Id INTEGER NOT NULL,
    FOREIGN KEY(empleado_Id) REFERENCES empleados(empleado_Id)
);

CREATE TABLE ventas (
    venta_Id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha_hora VARCHAR(40) NOT NULL,
    pago_Id VARCHAR(50),
    dni VARCHAR(45),
    promo_Id INTEGER NOT NULL,
	empleado_Id INTEGER NOT NULL,
    FOREIGN KEY(empleado_Id) REFERENCES empleados(empleado_Id),
    FOREIGN KEY(promo_Id) REFERENCES promociones(promo_Id)
);

CREATE TABLE pagos (
    pago_Id INTEGER PRIMARY KEY AUTOINCREMENT,
    total VARCHAR(40) NOT NULL,
    metodoPago_Id INTEGER NOT NULL,
	producto_Id INTEGER NOT NULL,
    FOREIGN KEY(producto_Id) REFERENCES productos(producto_Id),
    FOREIGN KEY(metodoPago_Id) REFERENCES metodoPago(metodoPago_Id)
);

CREATE TABLE roles (
    rol_Id INTEGER PRIMARY KEY AUTOINCREMENT,
    rolName VARCHAR(40) NOT NULL,
    empleado_Id INTEGER NOT NULL,
    FOREIGN KEY(empleado_Id) REFERENCES empleados(empleado_Id)
);

CREATE TABLE metodoPago (
    metodoPago_Id INTEGER PRIMARY KEY AUTOINCREMENT,
    pago VARCHAR(40) UNIQUE NOT NULL,
    visa VARCHAR(40),
    mastercard VARCHAR(40)
);

CREATE TABLE promociones (
    promo_Id INTEGER PRIMARY KEY AUTOINCREMENT,
    dni VARCHAR(40) UNIQUE NOT NULL,
    compras_hechas VARCHAR(40),
    cliente_Id INTEGER NOT NULL,
    FOREIGN KEY(cliente_Id) REFERENCES cliente(cliente_Id)
);

CREATE TABLE marcas (
    marca_Id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(40) UNIQUE NOT NULL,
    precios VARCHAR(40)
);
