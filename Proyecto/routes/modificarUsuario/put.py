from flask import Blueprint, jsonify, request
from db import get_db

put = Blueprint('put', __name__)

# Endpoint Modificar usuario
@put.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json
    print("➡️ Datos recibidos:", data)
    
    # 🚨 PUNTOS CLAVE PARA LA PRUEBA 🚨
    # 1. Creamos una variable para el apellido, forzando su valor.
    APELLIDO_DE_PRUEBA = "BUG_CAZADO"
    
    # 2. El resto de datos siguen viniendo del frontend.

    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("""
            UPDATE miembros
            SET nombre = %s, apellido = %s, email = %s, rol_id = %s
            WHERE miembro_id = %s
        """, (
            data.get('nombre'),
            APELLIDO_DE_PRUEBA, # 👈 AQUI USAMOS EL VALOR FORZADO
            data.get('email'),
            data.get('rol_id'),
            user_id
        ))
        db.commit()
        print("✅ Actualización realizada (con apellido forzado)")
        return jsonify({"message": "Usuario actualizado correctamente"}) 
    except Exception as e:
        db.rollback()
        print("❌ Error de DB detallado:", str(e))
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()
        db.close()


# from flask import Blueprint, jsonify, request
# from werkzeug.security import generate_password_hash
# from db import get_db

# put = Blueprint('put', __name__)

# # Endpoint Modificar usuario
# @put.route('/users/<int:user_id>', methods=['PUT'])
# def update_user(user_id):
#     data = request.json
#     db = get_db()
#     cursor = db.cursor()
#     try:
#         cursor.execute("""
#             UPDATE miembros
#             SET nombre = %s, apellido = %s, email = %s, rol_id = %s
#             WHERE miembro_id = %s
#         """, (
#             data['nombre'],
#             data['apellido'],
#             data['email'],
#             data['rol_id'],
#             user_id
#         ))
#         db.commit()
#         return jsonify({"message": "Usuario actualizado correctamente"}) 
#     except Exception as e:
#         db.rollback()
#         return jsonify({"error": str(e)}), 400
#     finally:
#         cursor.close()
#         db.close()

#     #     db.commit()
#     #     return jsonify({"message": "Usuario actualizado"}) 
#     # except Exception as e:
#     #     return jsonify({"error": str(e)}), 400
#     # finally:
#     #     cursor.close()
#     #     db.close()