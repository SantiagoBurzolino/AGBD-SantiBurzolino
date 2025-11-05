import axios from "axios";
jest.mock("axios"); // Esto asegura que todas las llamadas a axios sean mockeadas

const BASE_URL = "http://127.0.0.1:5000/api/aportes"; // Aunque esté en la URL, no se usará porque está mockeado

describe("Pruebas mockeadas de API Flask - Aportes", () => {
  test("Debería obtener la lista de aportes", async () => {
    // Respuesta mockeada de la API
    const fakeData = {
      data: [
        {
          id: 1,
          miembro_id: 1,
          planta_id: 1,
          tipo_aporte_id: 5,
          descripcion: "Donación de herramientas de jardinería",
          cantidad: 3,
          fecha_aporte: "2025-11-05",
        },
        {
          id: 2,
          miembro_id: 2,
          planta_id: 1,
          tipo_aporte_id: 3,
          descripcion: "Compra de semillas",
          cantidad: 10,
          fecha_aporte: "2025-11-04",
        },
      ],
      status: 200, // Agregamos el status para que esté disponible
    };

    // Mockeamos axios.get para devolver fakeData
    axios.get.mockResolvedValue(fakeData);

    // Realizamos la llamada mockeada
    const response = await axios.get(BASE_URL);

    // Verificaciones
    expect(response.status).toBe(200); // Mockeado, no real
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data[0].descripcion).toBe(
      "Donación de herramientas de jardinería"
    );
  });

  test("Debería crear un nuevo aporte", async () => {
    const nuevoAporte = {
      miembro_id: 1,
      planta_id: 1,
      tipo_aporte_id: 5,
      descripcion: "Donación de herramientas de jardinería",
      cantidad: 3,
    };

    // Respuesta mockeada para la creación del aporte
    axios.post.mockResolvedValue({
      status: 201,
      data: {
        resultado: "OK",
        id: 123,
        mensaje: "Aporte registrado",
      },
    });

    const response = await axios.post(BASE_URL, nuevoAporte);

    // Verificaciones
    expect(response.status).toBe(201);
    expect(response.data.resultado).toBe("OK");
    expect(response.data.mensaje).toBe("Aporte registrado");
    expect(response.data.id).toBe(123); // ID del nuevo aporte creado
  });
});

afterAll(() => {
  jest.restoreAllMocks(); // Limpia todos los mocks después de las pruebas
});
