import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

//components

import InputTodo from "./todolist/InputTodo";
import ListTodos from "./todolist/ListTodos";

const Dashboard = ({ setAuth }) => {
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/freelancers/", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();

      setAllTodos(parseData);
      
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
    setTodosChange(false);
  }, [todosChange]);

  return (
    <div>
      <div className="d-flex mt-5 justify-content-around">
        <h1 className="text-center">Añadir / Seleccionar freelancers </h1>
        <Link to="/projects" className="btn btn-primary ml-1">
            Proyectos
        </Link>
        <Link to="/clients" className="btn btn-primary ml-1">
            Clientes
        </Link>
        <button onClick={e => logout(e)} className="btn btn-danger">
          Logout
        </button>
        
      </div>

      <InputTodo setTodosChange={setTodosChange} />
      <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
    </div>
    
  );
};

export default Dashboard;
