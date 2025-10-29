import pytest

# --- Test: crear y obtener un aporte ---
def test_crear_y_obtener_aporte(client):
    # Datos del aporte (como si lo mandara un usuario desde HomeUser)
    nuevo_aporte = {
        "miembro_id": 1,          # ID de un miembro existente en tu DB
        "tipo_aporte_id": 5,      # ID de un tipo de aporte existente (ej: "Semillas")
        "descripcion": "Donación de herramientas de jardinería",
        "cantidad": 3
    }

    # 1️⃣ Crear un nuevo aporte
    response_post = client.post("/api/aportes", json=nuevo_aporte)
    assert response_post.status_code == 200
    data_post = response_post.get_json()
    assert data_post["resultado"] == "OK"
    assert "Aporte registrado" in data_post["mensaje"]

    # 2️⃣ Obtener los aportes de ese mismo miembro
    response_get = client.get(f"/api/aportes/{nuevo_aporte['miembro_id']}")
    assert response_get.status_code == 200
    data_get = response_get.get_json()

    # 3️⃣ Comprobar que el aporte recién creado está en la lista
    assert isinstance(data_get, list)
    assert any(aporte["descripcion"] == nuevo_aporte["descripcion"] for aporte in data_get)
