import "./HomeUser.css"; // Importamos los estilos

function HomeUser() {
  return (
    <div className="home-container">
      <h1>Bienvenido a la Huerta</h1>
      <p>Aquí podrás ver tus aportes y participar en actividades.</p>
      <button>Ver Aportes</button>
      <button>Realizar Aporte</button>
    </div>
  );
}

export default HomeUser;
