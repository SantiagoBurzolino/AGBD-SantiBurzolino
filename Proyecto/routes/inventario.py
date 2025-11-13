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
    return jsonify(resultados), 200

@inventario_bp.route("/api/inventario", methods=["POST"])
def agregar_inventario():
    datos = request.json or {}
    # Validaciones simples
    nombre = datos.get("nombre")
    tipo = datos.get("tipo")
    cantidad = datos.get("cantidad", 0)
    unidad = datos.get("unidad")
    descripcion = datos.get("descripcion", "")

    if not nombre or not tipo:
        return jsonify({"error": "nombre y tipo son requeridos"}), 400

    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
        INSERT INTO inventario (nombre, tipo, cantidad, unidad, descripcion)
        VALUES (%s, %s, %s, %s, %s)
    """, (nombre, tipo, cantidad, unidad, descripcion))
    db.commit()
    inserted_id = cursor.lastrowid
    cursor.close()
    db.close()
    return jsonify({"message": "Item creado", "id": inserted_id}), 201

@inventario_bp.route("/api/inventario/<int:item_id>", methods=["GET"])
def obtener_item(item_id):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM inventario WHERE id = %s", (item_id,))
    item = cursor.fetchone()
    cursor.close()
    db.close()
    if not item:
        return jsonify({"error": "Item no encontrado"}), 404
    return jsonify(item), 200

@inventario_bp.route("/api/inventario/<int:item_id>", methods=["PUT"])
def actualizar_item(item_id):
    datos = request.json or {}
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("""
            UPDATE inventario
            SET nombre=%s, tipo=%s, cantidad=%s, unidad=%s, descripcion=%s
            WHERE id=%s
        """, (
            datos.get("nombre"),
            datos.get("tipo"),
            datos.get("cantidad"),
            datos.get("unidad"),
            datos.get("descripcion"),
            item_id
        ))
        db.commit()
        return jsonify({"message": "Item actualizado"}), 200
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()
        db.close()

@inventario_bp.route("/api/inventario/<int:item_id>", methods=["DELETE"])
def eliminar_item(item_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM inventario WHERE id=%s", (item_id,))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({"message": "Item eliminado"}), 200