import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const Home = ({ setAuth }) => {

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.info("🔒️ La sesión ha sido cerrada");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (

    <div className="jumbotron mt-5">
      <h1>Bienvenido a la página para solicitud de proyectos</h1>
      <p>Elija a cual de las siguientes páginas quiere acceder</p>
        <Link to="/projects" className="btn btn-primary ml-1">
          Pedir proyecto
        </Link>
        <Link to="/clients" className="btn btn-primary ml-1">
          Perfil
        </Link>
        <Link to="/messages" className="btn btn-primary ml-1">
          Mensajes
        </Link>
        <button onClick={e => logout(e)} className="btn btn-danger">
          Logout
        </button>
    </div>
  );
};

export default Home;
