import { useState, useEffect } from "react";
import "./HomeAdmin.css";

function AdminHome() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [apellido, setApellido] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [editUser, setEditUser] = useState(null); // Para editar datos en el form
  const [showUsuarios, setShowUsuarios] = useState(false); // toggle ver/ocultar

  const miembroId = localStorage.getItem("miembro_id");
  const nombreUsuario = localStorage.getItem("nombre");

  // Si no hay sesión, redirigir al login
  useEffect(() => {
    if (!miembroId) {
      window.location.href = "/";
    }
  }, [miembroId]);

  const handleLogout = () => {
    localStorage.removeItem("miembro_id");
    localStorage.removeItem("nombre");
    localStorage.removeItem("rol_id");
    window.location.href = "/";
  };

  // Cargar usuarios solo cuando se pulsa "Ver Usuarios" o al refrescar después de editar/eliminar/crear
  const cargarUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      if (!res.ok) throw new Error("Error al traer usuarios");
      const data = await res.json();
      setUsuarios(data);
    } catch {
      setUsuarios([]);
    }
  };

  // Handler para eliminar
  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que quieres borrar este usuario?")) {
      const res = await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsuarios((u) => u.filter((usr) => usr.miembro_id !== id));
      }
    }
  };

  // Handler para modificar
  const handleActualizar = async (user) => {
    const res = await fetch(`http://localhost:5000/users/${user.miembro_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol_id: user.rol_id,
      }),
    });
    if (res.ok) {
      alert("Usuario actualizado");
      setEditUser(null);
      // refrescar tabla si está visible
      if (showUsuarios) cargarUsuarios();
    }
  };

  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, email, password, rol_id: 2 }),
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje(`El usuario ${nombre} ${apellido} se a creado correctamente.`);
        // refrescar tabla si está visible
        if (showUsuarios) cargarUsuarios();
      } else {
        setMensaje(data.error || "Error al crear usuario.");
      }
    } catch (error) {
      setMensaje("Error en el servidor");
    }
  };

  return (
    <div className="home-container">
      <header className="admin-header">
        <h1>Panel Admin</h1>
        <div className="admin-user-info">
          <span className="admin-greeting">Hola, {nombreUsuario}</span>
          <button className="logout-btn" onClick={handleLogout}>
          Cerrar sesión
          </button>
        </div>
      </header>
      
      {!showForm && (
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button
            style={{ marginTop: 24, marginBottom: 10 }}
            onClick={() => setShowForm(true)}
          >
            Crear Usuario
          </button>
          <button
            style={{ marginTop: 24, marginBottom: 10 }}
            onClick={async () => {
              if (!showUsuarios) await cargarUsuarios();
              setShowUsuarios((s) => !s);
            }}
          >
            {showUsuarios ? "Ocultar Usuarios" : "Ver Usuarios"}
          </button>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleCrearUsuario} style={{ marginTop: 20 }}>
          <div>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button type="submit">Crear Usuario</button>
            <button
              type="button"
              style={{ marginLeft: 10 }}
              onClick={() => setShowForm(false)}
              className="cancel-btn"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {mensaje && <p>{mensaje}</p>}

      {showUsuarios && (
        <table>
          <thead>
            <tr>
              <th>Nombre</th><th>Apellido</th><th>Email</th><th>Editar</th><th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.miembro_id}>
                <td>{u.nombre}</td>
                <td>{u.apellido}</td>
                <td>{u.email}</td>
                <td>
                  <button onClick={() => setEditUser(u)}>Editar</button>
                </td>
                <td>
                  <button onClick={() => handleEliminar(u.miembro_id)}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Form editar (si editUser no es null, mostrar el form con sus datos para editar) */}
      {editUser && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleActualizar(editUser);
          }}
        >
          {/* Inputs de nombre, apellido, etc, usando editUser para los valores */}
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={editUser.nombre}
              onChange={(e) => setEditUser({ ...editUser, nombre: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Apellido</label>
            <input
              type="text"
              value={editUser.apellido}
              onChange={(e) => setEditUser({ ...editUser, apellido: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={editUser.email}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Rol ID</label>
            <input
              type="number"
              value={editUser.rol_id}
              onChange={(e) =>
                setEditUser({ ...editUser, rol_id: parseInt(e.target.value) })
              }
              required
            />
          </div>
          <button type="submit">Guardar cambios</button>
          <button type="button" onClick={() => setEditUser(null)}>
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
}

export default AdminHome;
