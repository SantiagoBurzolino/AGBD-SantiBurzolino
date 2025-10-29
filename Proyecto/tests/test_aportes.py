def test_crear_y_obtener_aporte(client):
    # Datos del aporte (como si lo mandara un usuario desde HomeUser)
    nuevo_aporte = {
        "miembro_id": 1,            # Debe existir en la DB
        "planta_id": 1,             # Debe existir también
        "tipo_aporte_id": 5,        # Ej: "Compró insumos"
        "descripcion": "Donación de herramientas de jardinería",
        "cantidad": 3
    }

    # 1️⃣ Crear un nuevo aporte
    response_post = client.post("/api/aportes", json=nuevo_aporte)
    assert response_post.status_code == 201 
    data_post = response_post.get_json()
    assert data_post.get("resultado") == "OK"

    # 2️⃣ Obtener los aportes (simula HomeUser trayendo los suyos)
    response_get = client.get("/api/aportes")
    assert response_get.status_code == 200
    data_get = response_get.get_json()

    # 3️⃣ Comprobar que el aporte recién creado está en la lista
    assert any(aporte["descripcion"] == "Donación de herramientas de jardinería" for aporte in data_get)
