// import { useEffect, useState } from "react";

// function Miembros() {
//   const [miembros, setMiembros] = useState([]);

//   useEffect(() => {
//     fetch("http://127.0.0.1:5000/api/miembros") // 👈 tu backend Flask
//       .then((res) => res.json())
//       .then((data) => setMiembros(data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Miembros registrados</h2>
//       <ul>
//         {miembros.map((m) => (
//           <li key={m.id}>
//             <strong>{m.nombre}</strong> - {m.email} ({m.rol})
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Miembros;
