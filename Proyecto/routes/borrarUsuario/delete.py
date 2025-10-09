from flask import Blueprint, jsonify, request
from db import get_db

delete_user_bp = Blueprint('delete_user_bp', __name__)

#Endpoint: eliminar usuario
delete_user_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM miembros WHERE miembro_id = %s", (user_id,))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({"message": "Usuario eliminado"})