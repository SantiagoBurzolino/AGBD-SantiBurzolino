import { useState } from "react";
import "./Home.css"; // Importamos los estilos

function AdminHome() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleCrearUsuario = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password, rol_id: 2 }), // rol_id 2 = usuario
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(`Usuario ${nombre} creado correctamente.`);
      } else {
        setMensaje(data.error || "Error al crear usuario.");
      }
    } catch (error) {
      setMensaje("Error en el servidor");
    }
  };

  return (
    <div className="home-container">
      <h1>Panel Admin</h1>
      <form onSubmit={handleCrearUsuario}>
        <label>Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Crear Usuario</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default AdminHome;
