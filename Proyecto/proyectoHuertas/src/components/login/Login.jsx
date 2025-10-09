import { useState } from "react";
import "./Login.css"; // 👈 importa el CSS
import { useNavigate } from "react-router-dom";

function Login() {
  // Estados para guardar lo que escribe el usuario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado para mostrar mensajes de error o éxito
  const [mensaje, setMensaje] = useState("");
  // El navigate lo utilizo para el redireccionamiento al home dependiendo el rol
  const navigate = useNavigate();

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
        // Guardar los datos en localStorage
        localStorage.setItem("miembro_id", data.miembro_id);
        localStorage.setItem("nombre", data.nombre);
        localStorage.setItem("rol_id", data.rol_id);

        if (data.rol_id === 1) {
          navigate("/admin-home");
        } else {
          navigate("/user-home");
        }
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
        href="https://wa.me/5491161307820"
        target="_blank"
        rel="noopener noreferrer"
      >
        ¿Quieres participar de la huerta?
      </a>

      {/* Mensajes (error o bienvenida) */}
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Login;
