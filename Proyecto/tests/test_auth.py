import pytest

# Test para login exitoso con usuario ya existente
def test_login_success(client):
    # Datos del usuario que ya existe en tu base
    login_data = {
        "email": "roberto@gmail.com",  # <-- asegurate que este usuario exista
        "password": "user1234"
    }

    # Intentar hacer login
    response = client.post("/login", json=login_data)

    # Verificaciones
    assert response.status_code == 200  # Login exitoso
    data = response.get_json()
    assert "miembro_id" in data
    assert data["nombre"] == "roberto"  # Coincide con el usuario existente


# Test para login fallido (credenciales incorrectas)
def test_login_failure(client):
    login_data = {
        "email": "incorrect@example.com",
        "password": "wrongpassword"
    }
    response = client.post("/login", json=login_data)
    assert response.status_code == 401  # Credenciales incorrectas
    data = response.get_json()
    assert "error" in data
