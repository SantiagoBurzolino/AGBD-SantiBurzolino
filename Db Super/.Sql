CREATE TABLE categoria (
   categoria_Id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre  VARCHAR(50) NOT NULL UNIQUE
);
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
    precio VARCHAR(50),
    tel VARCHAR(45),
    stock VARCHAR(50) ,
    sinStock VARCHAR(45),
    fechaVencimiento VARCHAR(40),
    empleado_Id INTEGER NOT NULL,
    categoria_Id INTEGER NOT NULL,
    promo_Id INTEGER NOT NULL,
    cliente_Id INTEGER NOT NULL,
    FOREIGN KEY(empleado_Id) REFERENCES empleados(empleado_Id) ,
    FOREIGN KEY(cliente_Id) REFERENCES cliente(cliente_Id),
    FOREIGN KEY(promo_Id) REFERENCES promociones/Descuentos(promo_Id) ,
    FOREIGN KEY(categoria_Id) REFERENCES categoria(categoria_Id)
);

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