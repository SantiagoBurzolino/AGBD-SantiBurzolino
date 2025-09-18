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
    tipo = datos["tipo"]
    cantidad = datos["cantidad"]
    unidad = datos["unidad"]
    descripcion = datos["descripcion"]

    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
        INSERT INTO inventario (nombre, tipo, cantidad, unidad, descripcion)
        VALUES (%s, %s, %s, %s, %s)
    """, (nombre, tipo, cantidad, unidad, descripcion))
    db.commit()
    cursor.close()
    db.close()

    return jsonify({"resultado": "OK", "mensaje": "Item agregado al inventario"})


@inventario_bp.route("/api/inventario/<int:item_id>", methods=["GET"])
def obtener_item(item_id):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM inventario WHERE id = %s", (item_id,))
    item = cursor.fetchone()
    cursor.close()
    db.close()
    if item:
        return jsonify(item)
    return jsonify({"error": "Item no encontrado"}), 404


@inventario_bp.route("/api/inventario/<int:item_id>", methods=["PUT"])
def actualizar_item(item_id):
    datos = request.json
    nombre = datos["nombre"]
    tipo = datos["tipo"]
    cantidad = datos["cantidad"]
    unidad = datos["unidad"]
    descripcion = datos["descripcion"]

    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
        UPDATE inventario
        SET nombre=%s, tipo=%s, cantidad=%s, unidad=%s, descripcion=%s
        WHERE id=%s
    """, (nombre, tipo, cantidad, unidad, descripcion, item_id))
    db.commit()
    cursor.close()
    db.close()

    return jsonify({"resultado": "OK", "mensaje": "Item actualizado"})


