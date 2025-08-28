import mysql.connector
from flask import Flask, jsonify, request

app = Flask(__name__)

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

@app.route("/")
def index():
    return "<h1>App Huerta funcionando</h1>"

# 📦 Ruta para ver todo el inventario
@app.route("/api/inventario", methods=["GET"])
def obtener_inventario():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM inventario;")
    resultados = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(resultados)

# ➕ Ruta para agregar un item al inventario
@app.route("/api/inventario", methods=["POST"])
def agregar_inventario():
    datos = request.json
    nombre = datos["nombre"]
    cantidad = datos["cantidad"]

    db = get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO inventario (nombre, cantidad) VALUES (%s, %s)", (nombre, cantidad))
    db.commit()
    cursor.close()
    db.close()

    return jsonify({"resultado": "OK", "mensaje": "Item agregado al inventario"})

if __name__ == "__main__":
    app.run(debug=True)
