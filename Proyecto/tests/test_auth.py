import pytest

# Test para login exitoso
def test_login_success(client):
    # Primero, crea un usuario (ya que el login necesita un usuario existente)
    user_data = {
        "nombre": "Juan",
        "apellido": "Perez",
        "email": "juan@example.com",
        "password": "12345",
        "rol_id": 2
    }
    client.post("/register", json=user_data)  # Crear el usuario

    # Luego, intenta hacer login
    login_data = {
        "email": "juan@example.com",
        "password": "12345"
    }
    response = client.post("/login", json=login_data)  # Hacer login
    assert response.status_code == 200
    data = response.get_json()
    assert "miembro_id" in data  # Debe devolver el ID del miembro
    assert data["nombre"] == "Juan"  # Verificar nombre

# Test para login fallido (credenciales incorrectas)
def test_login_failure(client):
    login_data = {
        "email": "incorrect@example.com",
        "password": "wrongpassword"
    }
    response = client.post("/login", json=login_data)
    assert response.status_code == 401  # Credenciales incorrectas
    data = response.get_json()
    assert "error" in data  # Verificar el error
