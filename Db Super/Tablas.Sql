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
    stock INTEGER NOT NULL,
    tel VARCHAR(20),
    gmail VARCHAR(30) UNIQUE,
    precioProducto VARCHAR(30),
    marca VARCHAR(50) NOT NULL,
    empleado_Id INTEGER NOT NULL,
    producto_Id INTEGER NOT NULL,
    FOREIGN KEY(empleado_Id) REFERENCES empleados(empleado_Id) ,
    FOREIGN KEY(producto_Id) REFERENCES productos(producto_Id)
);

INSERT INTO proveedores(proveedor_Id, nombre, stock, tel, gmail, precioProducto,
 marca, empleado_Id, producto_Id) VALUES
('1', 'MisterClass', 50000, '11-5859-4031', 'MisterClass1@gmail.com', 'Coca cola'); 

CREATE TABLE productos (
    producto_Id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(40) NOT NULL,
    precio INTEGER,
    stock VARCHAR(50),
    empleado_Id INTEGER NOT NULL,
    categoria_Id INTEGER NOT NULL,
    promo_Id INTEGER NOT NULL,
    cliente_Id INTEGER NOT NULL,
    FOREIGN KEY(empleado_Id) REFERENCES empleados(empleado_Id),
    FOREIGN KEY(cliente_Id) REFERENCES cliente(cliente_Id),
    FOREIGN KEY(promo_Id) REFERENCES promociones(promo_Id) ,
    FOREIGN KEY(categoria_Id) REFERENCES categoria(categoria_Id)
);

INSERT INTO productos (producto_Id, nombre, precio, stock, empleado_Id, categoria_Id, promo_Id, 
cliente_Id, marca_Id) VALUES
('1', 'Pan Lactal Bimbo Blanco Grande ', '950.00', '30'),
('2','Gaseosa coca cola sabor original', '830.00', '30');

CREATE TABLE empleados (
    empleado_Id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(40) NOT NULL,
    apellido VARCHAR(50),
    puesto VARCHAR(45),
    rol_Id INTEGER NOT NULL,
    FOREIGN KEY(rol_Id) REFERENCES roles(rol_Id)
);

INSERT INTO empleados (empleado_Id, nombre, apellido, puesto, rol_Id) VALUES
('1', 'Juan Manuel', 'Parrado', 'Encargado', 2),
('2', 'Diego', 'Ajata Ledezma', 'Empleado De caja', 3);



CREATE TABLE cliente (
    cliente_Id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(40) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    dni INTEGER NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL,
	empleado_Id INTEGER NOT NULL,
    FOREIGN KEY(empleado_Id) REFERENCES empleados(empleado_Id)
);

INSERT INTO cliente(cliente_Id, nombre, apellido, dni, email, empleado_Id) VALUES
('5', 'mario', 'josema', 38-172-986, 'mariojosemaa2@gmail.com', );

CREATE TABLE ventas (
    venta_Id INTEGER PRIMARY KEY AUTOINCREMENT,
    totalVentas INTEGER,
    pago_Id INTEGER NOT NULL,
    promo_Id INTEGER NOT NULL,
	empleado_Id INTEGER NOT NULL,
    FOREIGN KEY(empleado_Id) REFERENCES empleados(empleado_Id),
    FOREIGN KEY(promo_Id) REFERENCES promociones(promo_Id),
    FOREIGN KEY(pago_Id) REFERENCES pagos(pago_Id)
);

INSERT INTO ventas (venta_Id ,totalVentas, empleado_Id, pago_Id, metodoPago_Id, promo_Id)
VALUES ('1', '', 5, 1, 2, 3);

CREATE TABLE pagos (
    pago_Id INTEGER PRIMARY KEY AUTOINCREMENT,
    total VARCHAR(40) NOT NULL,
    pago VARCHAR(40) UNIQUE NOT NULL,
    metodoPago_Id INTEGER NOT NULL,
    producto_Id INTEGER NOT NULL,
    FOREIGN KEY(producto_Id) REFERENCES productos(producto_Id),
    FOREIGN KEY(metodoPago_Id) REFERENCES metodos_pago(metodoPago_Id)
);



CREATE TABLE roles (
    rol_Id INTEGER PRIMARY KEY AUTOINCREMENT,
    rolName VARCHAR(40) NOT NULL,
    empleado_Id INTEGER NOT NULL,
    FOREIGN KEY(empleado_Id) REFERENCES empleados(empleado_Id)
);

INSERT INTO roles(rol_Id, rolName, nombre, empleado_Id) VALUES
('2', 'encargado', 'Juan Manuel', , 1),
('3', 'empleado de caja', 'diego', 2);


CREATE TABLE promociones (
    promo_Id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(40),
    dni INTEGER UNIQUE NOT NULL,
    cliente_Id INTEGER NOT NULL,
    FOREIGN KEY(cliente_Id) REFERENCES cliente(cliente_Id)
);

INSERT INTO promociones(promo_Id, nombre, dni, cliente_Id) VALUES
('30', 'descuentos en productos de limpieza', 38-172-986, '5')

CREATE TABLE metodos_pago (
  metodoPago_Id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre VARCHAR(50) NOT NULL -- ej: 'Efectivo', 'Transferencia', 'Tarjeta de crédito'
);

INSERT INTO metodos_pago (nombre)
VALUES 
  ('Efectivo'),
  ('Transferencia'),
  ('Tarjeta de débito'),
  ('Tarjeta de crédito'),
  ('MercadoPago');
