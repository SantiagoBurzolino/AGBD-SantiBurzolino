import { useState } from "react";

function Login() {
  // Estados para guardar lo que escribe el usuario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado para mostrar mensajes de error o éxito
  const [mensaje, setMensaje] = useState("");

  // Función que se ejecuta cuando se envía el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // evita que se recargue la página

    try {
      // Mandamos los datos al backend (endpoint /login)
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(`Bienvenido ${data.nombre}! Rol: ${data.rol_id}`);
        // Acá después podrías redirigir a otra página (ej: aportes, inventario)
      } else {
        setMensaje(data.error || "Error al iniciar sesión");
      }
    } catch (error) {
      setMensaje("Error en el servidor");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // guardamos lo que escribe
          required
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // guardamos lo que escribe
          required
        />

        <button type="submit">Ingresar</button>
      </form>

      {/* Link de WhatsApp del admin */}
      <a
        href="https://wa.me/5491112345678"
        target="_blank"
        rel="noopener noreferrer"
      >
        Contactar Admin por WhatsApp
      </a>

      {/* Mensajes (error o bienvenida) */}
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Login;
