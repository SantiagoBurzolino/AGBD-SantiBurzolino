CREATE TABLE inventario (
    id INTEGER  PRIMARY KEY AUTOINCREMENT,   
    nombre VARCHAR(100) NOT NULL,        
    tipo ENUM('semilla','herramienta','material') NOT NULL, 
    cantidad INTEGER NOT NULL DEFAULT 0,     
    unidad VARCHAR(50) NOT NULL,         
    descripcion TEXT                     
);