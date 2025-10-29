import pytest

# Test para obtener todos los usuarios
def test_obtener_usuarios(client):
    response = client.get("/users")  # Petición GET a /users
    assert response.status_code == 200
    data = response.get_json()
    
    # Verificar que el formato sea el esperado
    assert isinstance(data, dict)
    assert "usuarios" in data
    assert isinstance(data["usuarios"], list)
    assert len(data["usuarios"]) > 0


# Test para crear un nuevo usuario
def test_crear_usuario(client):
    user_data = {
        "nombre": "Carlos",
        "apellido": "Diaz",
        "email": "carlos@gmail.com",
        "password": "carlos1234",
        "rol_id": 2
    }
    response = client.post("/users", json=user_data)  # Crear un usuario
    assert response.status_code == 200  # Código 201 indica que el recurso fue creado correctamente
    data = response.get_json()
    assert data["mensaje"] == "Usuario creado correctamente"  # Mensaje de éxito
