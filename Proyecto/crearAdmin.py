from werkzeug.security import generate_password_hash
from flask import request, jsonify


# Ejemplo en Python para insertar admin
nombre = "Santi"
email = "santi@gmail.com"
password = "1234"  # contraseña que quieras
rol_id = 1  # admin

password_hash = generate_password_hash(password)

cursor.execute("""
    INSERT INTO miembros (nombre, email, password, rol_id, fecha_registro)
    VALUES (%s, %s, %s, %s, CURDATE())
""", (nombre, email, password_hash, rol_id))


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    cursor.execute("SELECT miembro_id, nombre, password, rol_id FROM miembros WHERE email=%s", (email,))
    user = cursor.fetchone()

    if user and check_password_hash(user['password'], password):
        # Devuelve información y token o miembro_id
        return jsonify({
            "miembro_id": user['miembro_id'],
            "nombre": user['nombre'],
            "rol_id": user['rol_id']
        })
    else:
        return jsonify({"error": "Credenciales incorrectas"}), 401
