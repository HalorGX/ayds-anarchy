import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

//components

import ListClients from "./clientlist/ListClients";

const Clients = ({ setAuth }) => {
  const [allClients, setAllClients] = useState([]);
  const [clientsChange, setClientsChange] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/clients/clientdata", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();

      setAllClients(parseData);

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
    setClientsChange(false);
  }, [clientsChange]);

  return (
    <div>
      <div className="d-flex mt-5 justify-content-around">
        <h1 className="text-center">Modificar perfil</h1>
        <Link to="/projects" className="btn btn-primary ml-1">
          Proyectos
        </Link>
        <Link to="/messages" className="btn btn-primary ml-1">
          Mensajes
        </Link>
        <button onClick={e => logout(e)} className="btn btn-danger">
          Logout
        </button>
        
      </div>
      <ListClients allClients={allClients} setClientsChange={setClientsChange} />
    </div>
    
  );
};

export default Clients;