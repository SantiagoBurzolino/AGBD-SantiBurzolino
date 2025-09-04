from flask import Blueprint, jsonify, request
from db import get_db

inventario_bp = Blueprint('inventario', __name__)

@inventario_bp.route("/api/inventario", methods=["GET"])
def obtener_inventario():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM inventario;")
    resultados = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(resultados)

@inventario_bp.route("/api/inventario", methods=["POST"])
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
