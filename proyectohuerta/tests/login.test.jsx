import { render, screen, fireEvent, act } from "@testing-library/react";
import Login from "../src/components/login/Login.jsx";
import { BrowserRouter } from "react-router-dom";

// Función para renderizar con Router, si el componente usa rutas o Navigate
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Componente: Login", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpia mocks para que no afecten tests siguientes
  });

  test("Realiza login exitoso y muestra mensaje", async () => {
    // Mock de fetch para simular respuesta exitosa del backend
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            nombre: "Santiago",
            rol_id: 1,
            miembro_id: "123",
          }),
      })
    );

    renderWithRouter(<Login />);

    // Obtener inputs y botón
    const email = screen.getByLabelText(/correo/i);
    const pass = screen.getByLabelText(/contraseña/i);
    const button = screen.getByRole("button", { name: /ingresar/i });

    // Simular entrada de datos
    fireEvent.change(email, { target: { value: "roberto@gmail.com" } });
    fireEvent.change(pass, { target: { value: "user1234" } });

    // Usar act para eventos que cambian estado (async)
    await act(async () => {
      fireEvent.click(button);
    });

    // Esperar que aparezca el mensaje de bienvenida en el DOM
    const mensaje = await screen.findByText(/bienvenido santiago! rol: 1/i);
    expect(mensaje).toBeInTheDocument();

    // Confirmar que fetch se llamó una vez
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test("Muestra error si el login falla", async () => {
    // Mock de fetch para simular error de login
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            error: "Credenciales incorrectas",
          }),
      })
    );

    renderWithRouter(<Login />);

    const email = screen.getByLabelText(/correo/i);
    const pass = screen.getByLabelText(/contraseña/i);
    const button = screen.getByRole("button", { name: /ingresar/i });

    fireEvent.change(email, { target: { value: "roberto@gmail.com" } });
    fireEvent.change(pass, { target: { value: "wrongpass" } });

    await act(async () => {
      fireEvent.click(button);
    });

    // Esperar mensaje de error visible en la pantalla
    const mensajeError = await screen.findByText(/credenciales incorrectas/i);
    expect(mensajeError).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
