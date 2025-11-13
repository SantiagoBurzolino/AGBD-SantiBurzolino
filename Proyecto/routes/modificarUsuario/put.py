from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash
from db import get_db

put = Blueprint('put', __name__)

# Endpoint Modificar usuario
@put.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """
    Actualiza miembro. Por seguridad:
    - Por defecto la contraseña se hashea antes de guardarse.
    - Si querés forzar guardar la contraseña tal cual (solo pruebas), pasar ?raw_password=true
    """
    data = request.json or {}
    raw_password_flag = request.args.get("raw_password", "false").lower() == "true"
    # Comentario de prueba: si quieres hacer pruebas rápidas puedes forzar el apellido:
    # APELLIDO_DE_PRUEBA = "BUG_CAZADO"  # <- descomentar si necesitás forzar valor en pruebas
    db = get_db()
    cursor = db.cursor()
    try:
        # Preparar password (hash por defecto)
        password_value = None
        if data.get('password') is not None:
            if raw_password_flag:
                # ADVERTENCIA: guardar contraseña en texto plano es inseguro. SOLO PARA PRUEBAS.
                password_value = data.get('password')
            else:
                password_value = generate_password_hash(data.get('password'))

        # Campos a actualizar dinámicamente
        fields = []
        params = []
        if data.get('nombre') is not None:
            fields.append("nombre = %s"); params.append(data.get('nombre'))
        if data.get('apellido') is not None:
            fields.append("apellido = %s"); params.append(data.get('apellido'))
        if data.get('email') is not None:
            fields.append("email = %s"); params.append(data.get('email'))
        if data.get('rol_id') is not None:
            fields.append("rol_id = %s"); params.append(data.get('rol_id'))
        if password_value is not None:
            fields.append("password = %s"); params.append(password_value)
        # Si no hay campos para actualizar
        if not fields:
            return jsonify({"error": "No hay campos para actualizar"}), 400

        sql = "UPDATE miembros SET " + ", ".join(fields) + " WHERE miembro_id = %s"
        params.append(user_id)
        cursor.execute(sql, tuple(params))
        db.commit()
        return jsonify({"message": "Usuario actualizado correctamente"}), 200
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()
        db.close()