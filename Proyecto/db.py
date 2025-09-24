import mysql.connector



# Configuración de conexión con MySQL
config = {
    'user': 'huerta',
    'password': 'huerta1234',
    'host': '10.9.120.5',
    'port': 3306,              
    'database': 'huertasUrbanas' 
}

def get_db():
    return mysql.connector.connect(**config)