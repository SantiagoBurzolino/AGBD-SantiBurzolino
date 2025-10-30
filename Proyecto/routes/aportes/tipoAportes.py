from flask import Blueprint, jsonify
from db import get_db

tipo_aporte_bp = Blueprint('tipo_aporte', __name__)

# GET /api/tipos_aporte -> lista tipos de aporte
@tipo_aporte_bp.route('/api/tipos_aporte', methods=['GET'])
def obtener_tipos_aporte():
    try:
        db = get_db()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT tipo_id, nombre FROM tipos_aporte;")
        tipos = cursor.fetchall()
        cursor.close()
        db.close()
        return jsonify(tipos), 200
    except Exception as e:
        return jsonify({"error": "Error al obtener tipos de aporte", "detalle": str(e)}), 500
