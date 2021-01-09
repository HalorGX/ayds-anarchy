import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

//components

import InputMessage from "./messages/InputMessage";
import ListMessages from "./messages/ListMessages";

const Messages = ({ setAuth }) => {
  const [allMessages, setAllMessages] = useState([]);
  const [messagesChange, setMessagesChange] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/messages/clientmessages", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();

      setAllMessages(parseData);

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
    setMessagesChange(false);
  }, [messagesChange]);

  return (
    <div>
      <div className="d-flex mt-5 justify-content-around">
        <h1 className="text-center"> Mensajes </h1>
        <Link to="/clients" className="btn btn-primary ml-1">
            Perfil
        </Link>
        <Link to="/projects" className="btn btn-primary ml-1">
            Proyectos
        </Link>
        <button onClick={e => logout(e)} className="btn btn-danger">
          Logout
        </button>
        
      </div>

      <InputMessage setMessagesChange={setMessagesChange} />
      <ListMessages allMessages={allMessages} setMessagesChange={setMessagesChange} />
    </div>
    
  );
};

export default Messages;
