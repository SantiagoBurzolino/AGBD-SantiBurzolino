from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from db import get_db

miembros_bp = Blueprint('miembros', __name__)

# 📌 GET - Ver todos los usuarios
@miembros_bp.route('/users', methods=['GET'])
def obtener_usuarios():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM miembros")
    usuarios = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(usuarios)

# 📌 POST - Crear nuevo usuario
@miembros_bp.route('/users', methods=['POST'])
def crear_usuario():
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

    return jsonify({"mensaje": "Usuario creado correctamente"})

# 📌 PUT - Actualizar
@miembros_bp.route('/users/<int:id>', methods=['PUT'])
def actualizar_usuario(id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
        UPDATE miembros 
        SET nombre=%s, email=%s, rol_id=%s
        WHERE miembro_id=%s
    """, (data['nombre'], data['email'], data['rol_id'], id))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({"mensaje": "Usuario actualizado"})

# 📌 DELETE - Eliminar
@miembros_bp.route('/users/<int:id>', methods=['DELETE'])
def eliminar_usuario(id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM miembros WHERE miembro_id=%s", (id,))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({"mensaje": "Usuario eliminado"})






# @miembros_bp.route('/miembros', methods=['POST'])
# def crear_miembro():
#     # Aquí debería validar que quien hace la petición es admin
#     data = request.json
#     nombre = data['nombre']
#     email = data['email']
#     password = data['password']
#     rol_id = data['rol_id']

#     password_hash = generate_password_hash(password)

#     db = get_db()
#     cursor = db.cursor()
#     cursor.execute("""
#         INSERT INTO miembros (nombre, email, password, rol_id, fecha_registro)
#         VALUES (%s, %s, %s, %s, CURDATE())
#     """, (nombre, email, password_hash, rol_id))
#     db.commit()
#     cursor.close()
#     db.close()

#     return jsonify({"mensaje": "Miembro creado correctamente"})
