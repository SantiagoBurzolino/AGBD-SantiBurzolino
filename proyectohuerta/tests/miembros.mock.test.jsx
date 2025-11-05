import axios from "axios";
jest.mock("axios");

describe("Pruebas mockeadas de miembros", () => {
  const BASE_URL = "http://127.0.0.1:5000/users";

  test("GET /users → devuelve lista simulada", async () => {
    const fakeData = {
      data: {
        usuarios: [
          { miembro_id: 1, nombre: "Santi", apellido: "Burzolino" },
          { miembro_id: 2, nombre: "Roberto", apellido: "Gómez" },
        ],
        total: 2,
      },
    };
    axios.get.mockResolvedValue(fakeData);

    const response = await axios.get(BASE_URL);

    expect(response.data.usuarios.length).toBe(2);
    expect(response.data.usuarios[0].nombre).toBe("Santi");
  });

  test("POST /users → crea usuario simulado", async () => {
    const nuevoUsuario = {
      nombre: "Test",
      apellido: "User",
      email: "mock@test.com",
    };
    axios.post.mockResolvedValue({
      data: { mensaje: "Usuario creado correctamente" },
    });

    const response = await axios.post(BASE_URL, nuevoUsuario);

    expect(response.data.mensaje).toBe("Usuario creado correctamente");
  });

  test("PUT /users/:id → actualiza usuario simulado", async () => {
    axios.put.mockResolvedValue({ data: { mensaje: "Usuario actualizado" } });

    const response = await axios.put(`${BASE_URL}/1`, {
      nombre: "Nuevo Nombre",
    });

    expect(response.data.mensaje).toBe("Usuario actualizado");
  });

  test("DELETE /users/:id → borra usuario simulado", async () => {
    axios.delete.mockResolvedValue({ data: { mensaje: "Usuario eliminado" } });

    const response = await axios.delete(`${BASE_URL}/1`);

    expect(response.data.mensaje).toBe("Usuario eliminado");
  });
});

afterAll(() => {
  jest.restoreAllMocks(); // Limpia todos los mocks después de las pruebas
});
