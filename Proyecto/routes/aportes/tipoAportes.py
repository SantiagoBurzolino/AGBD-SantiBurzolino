from flask import Blueprint, jsonify, request
from db import get_db


tipo_aporte_bp = Blueprint('tipo_aporte', __name__)

# obtener el tipo de aporte front
@tipo_aporte_bp.route('/api/tipos_aporte', methods=['GET'])
def obtener_tipos_aporte():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT tipo_id, nombre FROM tipos_aporte")
    tipos = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(tipos)

