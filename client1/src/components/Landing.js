import React from "react";
import { Link } from "react-router-dom";


const Landing = () => {
  return (

    <div className="jumbotron mt-5">
      <h1>Bienvenido a la página para manejo de proyectos</h1>
      <p>Inicia sesión para acceder a la plataforma</p>
      <Link to="/login" className="btn btn-primary">
        Login
      </Link>
      <Link to="/register" className="btn btn-primary ml-3">
        Registrate
      </Link>
    </div>
  );
};

export default Landing;
