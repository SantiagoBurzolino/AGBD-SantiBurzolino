from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from db import get_db

auth_bp = Blueprint('auth', __name__)

# =====================
# LOGIN
# =====================
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

    if user and password:
        return jsonify({
            "miembro_id": user['miembro_id'],
            "nombre": user['nombre'],
            "rol_id": user['rol_id'],
            
        })
    else:
        return jsonify({"error": "Credenciales incorrectas"}), 401


# =====================
# REGISTRO
# =====================
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    nombre = data['nombre']
    apellido = data['apellido']
    email = data['email']
    password = data['password']
    rol_id = data.get('rol_id', 2)  # por defecto 2 = usuario normal
    fecha_registro = data.get('fecha_registro', None)

    # Hashear la contraseña
    hashed_password = generate_password_hash(password)

    db = get_db()
    cursor = db.cursor()

    sql = """
        INSERT INTO miembros (nombre, apellido, fecha_registro, rol_id, email, password)
        VALUES (%s, %s, NOW(), %s, %s, %s)
    """
    cursor.execute(sql, (nombre, apellido, rol_id, email, hashed_password))
    db.commit()

    cursor.close()
    db.close()

    return jsonify({"message": "Miembro registrado correctamente"})
