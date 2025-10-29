import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import AdminHome from "./components/home/homeAdmin";
import HomeUser from "./components/home/homeUser";
//import Miembros from "./components/miembros/miembro";

function App() {
  return (
    <>

    <Router>
      <Routes>
         <Route path="/" element={<Login />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/user-home" element={<HomeUser />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;






