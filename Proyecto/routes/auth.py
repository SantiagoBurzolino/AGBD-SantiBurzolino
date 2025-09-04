from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from db import get_db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT miembro_id, nombre, password, rol_id FROM miembros WHERE email=%s", (email,))
    user = cursor.fetchone()
    cursor.close()
    db.close()

    if user and check_password_hash(user['password'], password):
        return jsonify({
            "miembro_id": user['miembro_id'],
            "nombre": user['nombre'],
            "rol_id": user['rol_id']
        })
    else:
        return jsonify({"error": "Credenciales incorrectas"}), 401
