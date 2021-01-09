import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

//components

import InputProject from "./projectlist/InputProject";
import ListProjects from "./projectlist/ListProjects";

const Projects = ({ setAuth }) => {
  const [allProjects, setAllProjects] = useState([]);
  const [projectsChange, setProjectsChange] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/projects/clientprojects", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();

      setAllProjects(parseData);

    } catch (err) {
      console.error(err.message);
    }
  };

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

  useEffect(() => {
    getProfile();
    setProjectsChange(false);
  }, [projectsChange]);

  return (
    <div>
      <div className="d-flex mt-5 justify-content-around">
        <h1 className="text-center">Administrar proyectos </h1>
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
      <InputProject setProjectsChange={setProjectsChange} />
      <ListProjects allProjects={allProjects} setProjectsChange={setProjectsChange} />
    </div>
    
  );
};

export default Projects;