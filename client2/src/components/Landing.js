import React from "react";
import { Link } from "react-router-dom";


const Landing = () => {
  return (

    <div className="jumbotron mt-5">
      <h1>Bienvenido a la página para solicitud de proyectos</h1>
      <p>Inicia sesión para usar la plataforma</p>
      <Link to="/login" className="btn btn-primary">
        Login
      </Link>
    </div>
  );
};

export default Landing;
