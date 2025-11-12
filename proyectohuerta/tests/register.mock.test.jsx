
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "../src/components/home/homeAdmin.jsx"; // Asumo que este es el componente correcto

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);
describe("Componente: Register", () => {
  

  beforeEach(() => {
    // Limpiamos los mocks de fetch antes de cada test
    global.fetch = jest.fn();
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
    jest.clearAllMocks(); // Limpia otros mocks si los hubiera
  });

  

  test("Renderiza correctamente los campos del formulario", () => {
    renderWithRouter(<Register />);

    const botonCrear = screen.getByRole("button", { name: /crear usuario/i });
    fireEvent.click(botonCrear);

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();

    // Verificamos que el botón de submit (dentro del formulario/modal) también esté
    // Asumiendo que el botón para abrir y el de submit tienen el mismo nombre
    expect(
      screen.getAllByRole("button", { name: /crear usuario/i }).length
    ).toBeGreaterThan(0);
  });

  test("Muestra mensaje de éxito cuando el registro es correcto", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ mensaje: "Usuario creado correctamente" }),
    });

    renderWithRouter(<Register />);

    // Abrir formulario
    fireEvent.click(screen.getByRole("button", { name: /crear usuario/i }));

    // Rellenar campos
    fireEvent.change(screen.getByLabelText(/nombre/i), {
      target: { value: "Santiago" },
    });
    fireEvent.change(screen.getByLabelText(/apellido/i), {
      target: { value: "Gomez" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "santi@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: "pass123" },
    });

    // Disparar submit dentro de act para esperar actualizaciones
    // Asegúrate de hacer clic en el botón de submit correcto (puede haber 2 con el mismo nombre)
    const submitButton =
      screen.getAllByRole("button", { name: /crear usuario/i })[1] ||
      screen.getAllByRole("button", { name: /crear usuario/i })[0];

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);

    // Esperar que aparezca mensaje de éxito en pantalla
    const mensajeExito = await screen.findByText(/creado correctamente/i);
    expect(mensajeExito).toBeInTheDocument();
  });

  test("Muestra error cuando el servidor rechaza el registro", async () => {
    // Configura el mock de fetch para este test
    global.fetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: "Email ya registrado" }),
    });

    renderWithRouter(<Register />);

    // 1. Abrir el formulario/modal
    fireEvent.click(screen.getByRole("button", { name: /crear usuario/i }));

    // 2. Rellenar los campos (¡ESTO FALTABA!)
    // El fetch no se llama porque probablemente tienes validación en el cliente
    // que impide el envío si los campos están vacíos.
    fireEvent.change(screen.getByLabelText(/nombre/i), {
      target: { value: "Usuario" },
    });
    fireEvent.change(screen.getByLabelText(/apellido/i), {
      target: { value: "Existente" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "repetido@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: "pass123" },
    });

    // 3. Enviar el formulario
    // Buscamos el segundo botón "Crear Usuario" (el del formulario/modal)
    const submitButton =
      screen.getAllByRole("button", { name: /crear usuario/i })[1] ||
      screen.getAllByRole("button", { name: /crear usuario/i })[0];

    await act(async () => {
      fireEvent.click(submitButton);
    });

    // 4. Verificar que fetch SÍ fue llamado
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // 5. Verificar que el mensaje de error del servidor se muestra
    const mensajeError = await screen.findByText(/email ya registrado/i);
    expect(mensajeError).toBeInTheDocument();
  });
});