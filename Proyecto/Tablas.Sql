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
    tipo_aporte_id INT NOT NULL,
    descripcion VARCHAR(255),
    cantidad INT,
    fecha DATE NOT NULL DEFAULT (CURDATE()),
    FOREIGN KEY (miembro_id) REFERENCES miembros(miembro_id),
    FOREIGN KEY (planta_id) REFERENCES plantas(planta_id),
    FOREIGN KEY (tipo_aporte_id) REFERENCES tipos_aporte(tipo_id)
);

CREATE TABLE tipos_aporte (
    tipo_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255)
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

ALTER TABLE miembros
ADD COLUMN password VARCHAR(255) NOT NULL;

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

ALTER TABLE plantas
ADD COLUMN fecha_cosecha_estimada DATE,
ADD COLUMN etapa ENUM('semilla','germinacion','crecimiento','cosecha') DEFAULT 'semilla';



CREATE TABLE mensajes (
    mensaje_id INT AUTO_INCREMENT PRIMARY KEY,
    remitente_id INT NOT NULL,
    destinatario_id INT NOT NULL,
    asunto VARCHAR(100),
    contenido TEXT NOT NULL,
    fecha_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
    leido BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (remitente_id) REFERENCES miembros(miembro_id),
    FOREIGN KEY (destinatario_id) REFERENCES miembros(miembro_id)
);


CREATE TABLE notificaciones (
    notificacion_id INT AUTO_INCREMENT PRIMARY KEY,
    miembro_id INT NOT NULL,
    tipo ENUM('aviso','recordatorio','alerta') NOT NULL,
    contenido TEXT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    leido BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (miembro_id) REFERENCES miembros(miembro_id)
);


CREATE TABLE historial_plantacion (
    historial_id INT AUTO_INCREMENT PRIMARY KEY,
    planta_id INT NOT NULL,
    estado VARCHAR(50) NOT NULL,
    fecha DATE NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (planta_id) REFERENCES plantas(planta_id)
);


CREATE TABLE tareas (
    tarea_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    planta_id INT,
    FOREIGN KEY (planta_id) REFERENCES plantas(planta_id)
);

CREATE TABLE turnos (
    turno_id INT AUTO_INCREMENT PRIMARY KEY,
    tarea_id INT NOT NULL,
    miembro_id INT NOT NULL,
    fecha DATE NOT NULL,
    hora_inicio TIME,
    hora_fin TIME,
    completado BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (tarea_id) REFERENCES tareas(tarea_id),
    FOREIGN KEY (miembro_id) REFERENCES miembros(miembro_id)
);


CREATE TABLE huertas (
    huerta_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255),
    descripcion TEXT,
    fecha_creacion DATE DEFAULT (CURRENT_DATE()),
    creador_id INT NOT NULL,
    FOREIGN KEY (creador_id) REFERENCES miembros(miembro_id)
);

CREATE TABLE miembros_huerta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    huerta_id INT NOT NULL,
    miembro_id INT NOT NULL,
    rol ENUM('creador','participante') DEFAULT 'participante',
    fecha_union DATE DEFAULT (CURRENT_DATE()),
    FOREIGN KEY (huerta_id) REFERENCES huertas(huerta_id),
    FOREIGN KEY (miembro_id) REFERENCES miembros(miembro_id)
);

