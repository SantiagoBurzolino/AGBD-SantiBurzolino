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
  const [showCrearUsuario, setShowCrearUsuario] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const usuariosPorPagina = 3;

  // Cálculo robusto de total de páginas (evita NaN/undefined)
  const totalPaginas = Math.max(
    1,
    Math.ceil((totalUsuarios || 0) / usuariosPorPagina)
  );

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

  // 🔹 Función para cargar usuarios con paginado
  const cargarUsuarios = async (page = 1) => {
    try {
      const res = await fetch(
        `http://localhost:5000/users?page=${page}&limit=${usuariosPorPagina}`
      );
      if (!res.ok) throw new Error("Error al traer usuarios");
      const data = await res.json();
      setUsuarios(data.usuarios || []);
      setTotalUsuarios(data.total ?? 0);
      setPaginaActual(page);
    } catch {
      setUsuarios([]);
      setTotalUsuarios(0);
      setPaginaActual(1);
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
        // Opcional: recargar para mantener el conteo consistente
        if (showUsuarios) cargarUsuarios(paginaActual);
      }
    }
  };

  // Handler para modificar
  const handleActualizar = async (user) => {
    console.log("Datos que envío al backend:", user);
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
      if (showUsuarios) cargarUsuarios(paginaActual);
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
        setMensaje(
          `El usuario ${nombre} ${apellido} se a creado correctamente.`,
          setTimeout(() => {
            setShowCrearUsuario(false);
            setShowUsuarios(false);
            setMensaje("");
            setShowForm(false);
          }, 2000)
        );
        setNombre("");
        setApellido("");
        setEmail("");
        setPassword("");
        if (showUsuarios) cargarUsuarios(1);
      } else {
        setMensaje(data.error || "Error al crear usuario.");
      }
    } catch (error) {
      setMensaje("Error en el servidor");
    }
  };

  // ————————————————————————————————————————
  // PAGINADO PROGRESIVO: función para decidir qué números mostrar
  function getPaginasAMostrar(pagActual, totPag, ventana = 4) {
    const paginas = [];
    if (!Number.isFinite(pagActual)) pagActual = 1;
    if (!Number.isFinite(totPag) || totPag < 1) totPag = 1;

    const mitad = Math.floor(ventana / 2);

    let start = Math.max(1, pagActual - mitad);
    let end = Math.min(totPag, start + ventana - 1);

    // Ajuste si estamos cerca del final o del inicio
    if (end - start + 1 < ventana) {
      if (start === 1) {
        end = Math.min(totPag, start + ventana - 1);
      } else if (end === totPag) {
        start = Math.max(1, end - ventana + 1);
      }
    }

    for (let i = start; i <= end; i++) paginas.push(i);
    return paginas;
  }
  // ————————————————————————————————————————

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
              if (!showUsuarios) await cargarUsuarios(1);
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
        <>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Editar</th>
                <th>Borrar</th>
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
                    <button onClick={() => handleEliminar(u.miembro_id)}>
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 🔹 Paginación progresiva */}
          <div className="pagination" style={{ marginTop: "10px" }}>
            <button
              onClick={() => cargarUsuarios(1)}
              disabled={paginaActual <= 1}
            >
              {"<<"}
            </button>
            <button
              onClick={() => cargarUsuarios(Math.max(1, paginaActual - 1))}
              disabled={paginaActual <= 1}
            >
              {"<"}
            </button>

            {getPaginasAMostrar(paginaActual, totalPaginas, 4).map((num) => (
              <button
                key={num}
                onClick={() => cargarUsuarios(num)}
                className={paginaActual === num ? "active" : ""}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() =>
                cargarUsuarios(Math.min(totalPaginas, paginaActual + 1))
              }
              disabled={paginaActual >= totalPaginas}
            >
              {">"}
            </button>
            <button
              onClick={() => cargarUsuarios(totalPaginas)}
              disabled={paginaActual >= totalPaginas}
            >
              {">>"}
            </button>
          </div>
        </>
      )}

      {/* Form editar (si editUser no es null, mostrar el form con sus datos para editar) */}
      {editUser && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleActualizar(editUser);
          }}
        >
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={editUser.nombre}
              onChange={(e) =>
                setEditUser({ ...editUser, nombre: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Apellido</label>
            <input
              type="text"
              value={editUser.apellido}
              onChange={(e) =>
                setEditUser({ ...editUser, apellido: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
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
