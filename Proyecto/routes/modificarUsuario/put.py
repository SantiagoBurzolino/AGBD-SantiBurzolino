from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash
from db import get_db

put = Blueprint('put', __name__)

# Endpoint Modificar usuario
@put.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    try:
        hashed_password = generate_password_hash(data['password'])
        cursor.execute("""
            UPDATE miembros
            SET nombre = %s, apellido = %s, fecha_registro = %s, password = %s, email = %s, rol_id = %s
            WHERE miembro_id = %s
        """, (
            data['nombre'],
            data['apellido'],
            data['fecha_registro'],
            hashed_password,
            data['email'],
            data['rol_id'],
            user_id
        ))
        db.commit()
        return jsonify({"message": "Usuario actualizado"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()
        db.close()