from flask import Blueprint, jsonify, request
from db import get_db

aportes_bp = Blueprint('aportes', __name__)

# Utilidad simple: lee JSON y valida campos
def leer_json(campos_obligatorios):
    datos = request.get_json(silent=True)  # None si no viene JSON
    if datos is None:
        return None, ("El cuerpo debe ser JSON y usar Content-Type: application/json", 400)
    for c in campos_obligatorios:
        if c not in datos:
            return None, (f"Falta el campo {c}", 400)
    return datos, None

# GET /api/aportes  -> lista todos (admin o pruebas)
@aportes_bp.route("/api/aportes", methods=["GET"])
def obtener_aportes():
    try:
        db = get_db()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM aportes;")
        datos = cursor.fetchall()
        cursor.close()
        db.close()
        return jsonify(datos), 200
    except Exception as e:
        return jsonify({"error": "Error al listar aportes", "detalle": str(e)}), 500

# GET /api/aportes/<miembro_id> -> lista por miembro
@aportes_bp.route("/api/aportes/<int:miembro_id>", methods=["GET"])
def obtener_aportes_por_miembro(miembro_id):
    try:
        db = get_db()
        cursor = db.cursor(dictionary=True)
        consulta = """
            SELECT a.id,
                   m.nombre,
                   m.apellido,
                   t.nombre AS tipo_aporte,
                   a.descripcion,
                   a.cantidad,
                   a.fecha_aporte
            FROM aportes a
            JOIN miembros m ON a.miembro_id = m.id
            JOIN tipos_aporte t ON a.tipo_aporte_id = t.id
            WHERE a.miembro_id = %s
            ORDER BY a.fecha_aporte DESC;
        """
        cursor.execute(consulta, (miembro_id,))
        datos = cursor.fetchall()
        cursor.close()
        db.close()
        return jsonify(datos), 200
    except Exception as e:
        return jsonify({"error": "Error al listar aportes del miembro", "detalle": str(e)}), 500

# POST /api/aportes -> crear aporte
@aportes_bp.route("/api/aportes", methods=["POST"])
def agregar_aporte():
    try:
        requeridos = ["miembro_id", "planta_id", "tipo_aporte_id", "descripcion", "cantidad"]
        datos, error = leer_json(requeridos)
        if error:
            msg, code = error
            return jsonify({"error": msg}), code

        miembro_id = datos["miembro_id"]
        planta_id = datos["planta_id"]
        tipo_id = datos.get("tipo_id", 1)  # opcional, por defecto 1
        tipo_aporte_id = datos["tipo_aporte_id"]
        descripcion = datos["descripcion"]
        cantidad = datos["cantidad"]

        db = get_db()
        cursor = db.cursor()
        cursor.execute("""
            INSERT INTO aportes (miembro_id, planta_id, tipo_id, tipo_aporte_id, descripcion, cantidad, fecha_aporte)
            VALUES (%s, %s, %s, %s, %s, %s, CURDATE())
        """, (miembro_id, planta_id, tipo_id, tipo_aporte_id, descripcion, cantidad))
        db.commit()
        nuevo_id = cursor.lastrowid
        cursor.close()
        db.close()

        return jsonify({"resultado": "OK", "id": nuevo_id, "mensaje": "Aporte registrado"}), 201
    except Exception as e:
        return jsonify({"error": "No se pudo crear el aporte", "detalle": str(e)}), 500
