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

