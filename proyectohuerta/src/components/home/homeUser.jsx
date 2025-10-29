import React, { useState, useEffect } from "react";
import "./HomeUser.css";

function HomeUser() {
  const [aportes, setAportes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [error, setError] = useState(null);
  const [tipoAporte, setTipoAporte] = useState(0);
  const [tiposAporte, setTiposAporte] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tipo_aporte_id: "",
    descripcion: "",
    cantidad: "",
  });

  const miembroId = localStorage.getItem("miembro_id");
  const nombreUsuario = localStorage.getItem("nombre");

  // Si no hay sesión, redirigir al login
  useEffect(() => {
    if (!miembroId) {
      window.location.href = "/";
    }
  }, [miembroId]);

  const verAportes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/aportes/${miembroId}`);
      if (!res.ok) throw new Error("Error al consultar aportes");
      const data = await res.json();
      setAportes(data);
    } catch (err) {
      setError(err.message);
      setAportes([]);
    } finally {
      setIsLoading(false);
      setHasFetched(true);
    }
  };

  const get_tipo_aporte = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/tipos_aporte");
      if (!res.ok) throw new Error("Error al consultar tipos de aporte");
      const data = await res.json();
      setTiposAporte(data);
    } catch (err) {
      setTiposAporte([]);
    }
  };

  useEffect(() => {
    get_tipo_aporte();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("miembro_id");
    localStorage.removeItem("nombre");
    localStorage.removeItem("rol_id");
    window.location.href = "/";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitAporte = async (e) => {
    e.preventDefault();
    if (!formData.tipo_aporte_id || !formData.cantidad) {
      alert("Completá tipo de aporte y cantidad");
      return;
    }

    const payload = {
      miembro_id: parseInt(miembroId),
      tipo_aporte_id: parseInt(formData.tipo_aporte_id),
      descripcion: formData.descripcion || "",
      cantidad: parseInt(formData.cantidad),
    };

    try {
      const res = await fetch("http://127.0.0.1:5000/api/aportes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error al registrar aporte");
      const result = await res.json();
      alert(result.mensaje || "Aporte registrado");
      setShowForm(false);
      setFormData({ tipo_aporte_id: "", descripcion: "", cantidad: "" });
      if (hasFetched) verAportes();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="home-container">
      <div className="navbar">
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <h1>Panel Usuario</h1>
            <p>Aquí podrás ver tus aportes y participar en actividades.</p>
          </div>
          <div>
            <span style={{ marginRight: "10px", fontWeight: "500" }}>
              Hola, {nombreUsuario}
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </header>
      </div>

      <div style={{ marginTop: 10, display: "flex", gap: "10px" }}>
        <button onClick={verAportes}>Ver Aportes</button>
        <button
          onClick={() => setShowForm((s) => !s)}
          style={{ marginLeft: 0 }}
        >
          {showForm ? "Cancelar" : "Realizar Aporte"}
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        {isLoading && <p>Cargando aportes...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!isLoading && !hasFetched && (
          <p>Presioná "Ver Aportes" para consultar tus aportes.</p>
        )}

        {!isLoading && hasFetched && aportes.length === 0 && (
          <p>No tenés aportes todavía.</p>
        )}

        {!isLoading && aportes.length > 0 && (
          <ul className="aportes-list">
            {aportes.map((a) => (
              <li key={a.id}>
                <strong>{a.tipo_aporte}</strong>
                <span>
                  {a.descripcion ? `— ${a.descripcion}` : "— Sin descripción"}
                </span>
                <span>
                  <b>Cantidad:</b> {a.cantidad}
                </span>
                <span>
                  <b>Fecha:</b> {a.fecha_aporte}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={submitAporte}
          className="aporte-form"
          style={{ marginTop: 20 }}
        >
          <h3 style={{ marginBottom: "12px" }}>Registrar aporte</h3>
          <label>
            Tipo de aporte:
            <select
              name="tipo_aporte_id"
              value={formData.tipo_aporte_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona tipo</option>
              {tiposAporte.map((t) => (
                <option key={t.tipo_id} value={t.tipo_id}>
                  {t.nombre}
                </option>
              ))}
            </select>
          </label>
          <label>
            Cantidad:
            <input
              type="number"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              min={1}
              required
            />
          </label>
          <label>
            Descripción:
            <input
              type="text"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              maxLength={80}
              placeholder="Opcional"
            />
          </label>
          <button type="submit">Enviar aporte</button>
        </form>
      )}
    </div>
  );
}

export default HomeUser;

// import React, { useState, useEffect } from "react";
// import "./HomeUser.css";

// function HomeUser() {
//   const [aportes, setAportes] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasFetched, setHasFetched] = useState(false);
//   const [error, setError] = useState(null);

//   // para el formulario de aporte
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     tipo_aporte_id: "",
//     descripcion: "",
//     cantidad: ""
//   });

//   // obtener miembroId y nombre desde localStorage (se guardan al loguear)
//   const miembroId = localStorage.getItem("miembro_id");
//   const nombreUsuario = localStorage.getItem("nombre");

//   // al montar, si no hay sesión redirijo al login
//   useEffect(() => {
//     if (!miembroId) {
//       // redirigir a la página de login (ajustá la ruta si tu login está en otra)
//       window.location.href = "/";
//     }
//   }, [miembroId]);

//   // función para traer aportes de este miembro
//   const verAportes = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`http://127.0.0.1:5000/api/aportes/${miembroId}`);
//       if (!res.ok) throw new Error("Error al consultar aportes");
//       const data = await res.json();
//       setAportes(data);
//     } catch (err) {
//       setError(err.message);
//       setAportes([]);
//     } finally {
//       setIsLoading(false);
//       setHasFetched(true);
//     }
//   };

//   // logout: limpiar localStorage y volver a login
//   const handleLogout = () => {
//     localStorage.removeItem("miembro_id");
//     localStorage.removeItem("nombre");
//     localStorage.removeItem("rol_id");
//     window.location.href = "/";
//   };

//   // Handlers formulario
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const submitAporte = async (e) => {
//     e.preventDefault();
//     // validación mínima
//     if (!formData.tipo_aporte_id || !formData.cantidad) {
//       alert("Completá tipo de aporte y cantidad");
//       return;
//     }

//     const payload = {
//       miembro_id: parseInt(miembroId),
//       tipo_aporte_id: parseInt(formData.tipo_aporte_id),
//       descripcion: formData.descripcion || "",
//       cantidad: parseInt(formData.cantidad)
//     };

//     try {
//       const res = await fetch("http://127.0.0.1:5000/api/aportes", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//       });
//       if (!res.ok) throw new Error("Error al registrar aporte");
//       const result = await res.json();
//       // opcional: avisar y refrescar la lista
//       alert(result.mensaje || "Aporte registrado");
//       setShowForm(false);
//       setFormData({ tipo_aporte_id: "", descripcion: "", cantidad: "" });
//       // si ya habías hecho verAportes antes, refrescá la lista:
//       if (hasFetched) verAportes();
//     } catch (err) {
//       alert("Error: " + err.message);
//     }
//   };

//   return (
//     <div className="navbar">
//       <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <div>
//           <h1>Bienvenido{nombreUsuario ? `, ${nombreUsuario}` : ""}</h1>
//           <p>Aquí podrás ver tus aportes y participar en actividades.</p>
//         </div>
//         <div>
//     <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
//   </div>
//       </header>

//       <div style={{ marginTop: 20 }}>
//         <button onClick={verAportes}>Ver Aportes</button>
//         <button onClick={() => setShowForm((s) => !s)} style={{ marginLeft: 8 }}>
//           {showForm ? "Cancelar" : "Realizar Aporte"}
//         </button>
//       </div>

//       <div style={{ marginTop: 16 }}>
//         {isLoading && <p>Cargando aportes...</p>}
//         {error && <p style={{ color: "red" }}>{error}</p>}

//         {!isLoading && !hasFetched && <p>Presioná "Ver Aportes" para consultar tus aportes.</p>}

//         {!isLoading && hasFetched && aportes.length === 0 && <p>No tenés aportes todavía.</p>}

//         {!isLoading && aportes.length > 0 && (
//           <ul>
//             {aportes.map((a) => (
//               <li key={a.id}>
//                 {a.tipo_aporte} — {a.descripcion || "sin descripción"} — Cant: {a.cantidad} — Fecha: {a.fecha_aporte}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {showForm && (
//         <form onSubmit={submitAporte} style={{ marginTop: 20 }}>
//           <h3>Registrar aporte</h3>
//           <label>
//             Tipo de aporte (id):
//             <input type="number" name="tipo_aporte_id" value={formData.tipo_aporte_id} onChange={handleChange} />
//             {/* ideal sería un <select> con tipos traídos desde /api/tipos_aporte */}
//           </label>
//           <br />
//           <label>
//             Cantidad:
//             <input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} />
//           </label>
//           <br />
//           <label>
//             Descripción:
//             <input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} />
//           </label>
//           <br />
//           <button type="submit">Enviar aporte</button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default HomeUser;
