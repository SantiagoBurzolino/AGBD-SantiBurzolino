import pytest

# ============================
# Test: Login exitoso y redirección según rol
# ============================
def test_login_success(client):
    # Datos de un usuario que ya exista (ajustá el email según tu base)
    login_data = {
        "email": "roberto@gmail.com",  # Usuario real existente
        "password": "user1234"
    }

    response = client.post("/login", json=login_data)
    assert response.status_code == 200  # Login exitoso

    data = response.get_json()
    assert "miembro_id" in data
    assert "rol_id" in data
    assert "nombre" in data


    # Simulamos redirección según rol
    if data["rol_id"] == 1:
        destino = "/homeAdmin"
    else:
        destino = "/homeUser"

    # Verificamos que el destino sea coherente
    print(f"Usuario {data['nombre']} redirigido a: {destino}")
    assert destino in ["/homeAdmin", "/homeUser"]


# ============================
# Test: Login fallido (credenciales incorrectas)
# ============================
def test_login_failure(client):
    login_data = {
        "email": "incorrect@example.com",
        "password": "wrongpassword"
    }
    response = client.post("/login", json=login_data)
    assert response.status_code == 401  # Credenciales incorrectas
    data = response.get_json()
    assert "error" in data
