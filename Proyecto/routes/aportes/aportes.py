from flask import Blueprint, jsonify, request
from db import get_db

# Creamos la blueprint de aportes
aportes_bp = Blueprint('aportes', __name__)


# Obtener todos los aportes (admin)
@aportes_bp.route("/api/aportes", methods=["GET"])
def obtener_aportes():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM aportes;")
    resultados = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(resultados)

# Obtener aportes de un miembro específico
@aportes_bp.route("/api/aportes/<int:miembro_id>", methods=["GET"])
def obtener_aportes_por_miembro(miembro_id):
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
    resultados = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(resultados)



# Crear un nuevo aporte (usuario)
@aportes_bp.route("/api/aportes", methods=["POST"])
def agregar_aporte():
    datos = request.json
    miembro_id = datos["miembro_id"]
    tipo_aporte_id = datos["tipo_aporte_id"]  # ej: semillas, herramientas, dinero
    descripcion = datos["descripcion"]
    cantidad = datos["cantidad"]

    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
        INSERT INTO aportes (miembro_id, tipo_aporte_id, descripcion, cantidad, fecha_aporte)
        VALUES (%s, %s, %s, %s, CURDATE())
    """, (miembro_id, tipo_aporte_id, descripcion, cantidad))
    db.commit()
    cursor.close()
    db.close()

    return jsonify({"resultado": "OK", "mensaje": "Aporte registrado"})
