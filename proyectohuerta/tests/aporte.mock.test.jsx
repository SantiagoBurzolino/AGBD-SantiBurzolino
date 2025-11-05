import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/api/aportes";

describe("Pruebas de API Flask - Aportes", () => {
  test("Debería obtener la lista de aportes", async () => {
    const response = await axios.get(BASE_URL);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test("Debería crear un nuevo aporte", async () => {
    const nuevoAporte = {
      miembro_id: 1,
      planta_id: 1,
      tipo_aporte_id: 5,
      descripcion: "Donación de herramientas de jardinería",
      cantidad: 3,
    };

    const response = await axios.post(BASE_URL, nuevoAporte);
    expect(response.status).toBe(201);
    expect(response.data.resultado).toBe("OK");
  });
});
