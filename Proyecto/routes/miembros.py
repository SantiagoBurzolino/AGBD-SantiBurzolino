from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from db import get_db

miembros_bp = Blueprint('miembros', __name__)

@miembros_bp.route('/miembros', methods=['POST'])
def crear_miembro():
    # Aquí debería validar que quien hace la petición es admin
    data = request.json
    nombre = data['nombre']
    email = data['email']
    password = data['password']
    rol_id = data['rol_id']

    password_hash = generate_password_hash(password)

    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
        INSERT INTO miembros (nombre, email, password, rol_id, fecha_registro)
        VALUES (%s, %s, %s, %s, CURDATE())
    """, (nombre, email, password_hash, rol_id))
    db.commit()
    cursor.close()
    db.close()

    return jsonify({"mensaje": "Miembro creado correctamente"})
