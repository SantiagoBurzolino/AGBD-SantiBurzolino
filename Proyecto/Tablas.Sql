CREATE TABLE inventario (
    id INTEGER  PRIMARY KEY AUTO_INCREMENT,   
    nombre VARCHAR(100) NOT NULL,        
    tipo ENUM('semilla','herramienta','material') NOT NULL, 
    cantidad INTEGER NOT NULL DEFAULT 0,     
    unidad VARCHAR(50) NOT NULL,         
    descripcion TEXT                     
);

INSERT INTO inventario (nombre, tipo, cantidad, unidad, descripcion) 
VALUES 
('Semilla de tomate', 'semilla', 50, 'g', 'Semillas orgánicas de tomate cherry'),
('Semilla de lechuga', 'semilla', 30, 'g', 'Ideal para huerta urbana'),
('Regadera', 'herramienta', 5, 'unidades', 'Plástico resistente'),
('Pala', 'herramienta', 3, 'unidades', 'Pala para plantar'),
('Fertilizante orgánico', 'material', 10, 'kg', 'Fertilizante natural para plantas'),
('Macetas pequeñas', 'material', 20, 'unidades', 'Macetas de plástico para siembra');



CREATE TABLE aportes (
    aporte_id INT AUTO_INCREMENT PRIMARY KEY,
    miembro_id INT NOT NULL,
    planta_id INT NOT NULL,
    tipo_aporte VARCHAR(50) NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (miembro_id) REFERENCES miembros(miembro_id),
    FOREIGN KEY (planta_id) REFERENCES plantas(planta_id)
);

CREATE TABLE miembros (
    miembro_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    fecha_registro DATE,
    rol_id INT,
    FOREIGN KEY (rol_id) REFERENCES roles(rol_id)
);

CREATE TABLE roles (
    rol_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);


INSERT INTO roles (nombre) VALUES ('admin'), ('miembro');

CREATE TABLE plantas (
    planta_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_comun VARCHAR(100) NOT NULL,
    nombre_cientifico VARCHAR(150),
    fecha_plantacion DATE,
    estado VARCHAR(50)
);


ALTER TABLE miembros
ADD COLUMN password VARCHAR(255) NOT NULL;
