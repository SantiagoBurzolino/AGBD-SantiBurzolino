#!/usr/bin/env python3
"""
hash_passwords.py

Recorre la tabla `miembros` y reemplaza las contraseñas en texto plano
por su hash seguro usando werkzeug.generate_password_hash.

USO:
  - Activá tu virtualenv
  - python hash_passwords.py
"""

import mysql.connector
from werkzeug.security import generate_password_hash

# --- CONFIGURACION: editá esto con los datos de tu BD si es necesario ---
config = {
    "user": "huerta",
    "password": "huerta1234",
    "host": "10.9.120.5",
    "port": 3306,
    "database": "huertasUrbanas",
}
# ------------------------------------------------------------------------

def is_hashed(pwd: str) -> bool:
    """
    Detecta si una contraseña ya está en formato hashed de werkzeug (pbkdf2)
    Ajustá la heurística si usás otro esquema de hashing.
    """
    if not pwd:
        return False
    # werkzeug produce algo que empieza con 'pbkdf2:' por defecto
    return pwd.startswith("pbkdf2:")

def main():
    print("Conectando a la base de datos...")
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)

    try:
        cursor.execute("SELECT miembro_id, password FROM miembros")
        usuarios = cursor.fetchall()
        total = len(usuarios)
        print(f"Usuarios encontrados: {total}")

        updated = 0
        for u in usuarios:
            miembro_id = u["miembro_id"]
            pwd = u.get("password") or ""

            if is_hashed(pwd):
                print(f"[SKIP] miembro_id={miembro_id}: ya está hasheada")
                continue

            # Generar hash seguro (por defecto usa pbkdf2:sha256)
            new_hash = generate_password_hash(pwd)
            # Actualizar la fila
            upd_cursor = db.cursor()
            upd_cursor.execute(
                "UPDATE miembros SET password=%s WHERE miembro_id=%s",
                (new_hash, miembro_id),
            )
            db.commit()
            upd_cursor.close()

            updated += 1
            print(f"[OK]   miembro_id={miembro_id} -> actualizado")

        print(f"\nProceso finalizado: {updated} contraseñas actualizadas, {total-updated} sin cambios.")
    except Exception as e:
        print("Ocurrió un error:", e)
    finally:
        cursor.close()
        db.close()

if __name__ == "__main__":
    main()
