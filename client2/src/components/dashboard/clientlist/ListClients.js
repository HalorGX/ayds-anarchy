import React, { Fragment, useState, useEffect } from "react";
import EditClient from "./EditClient";

const ListClients = ({ allClients, setClientsChange }) => {
  console.log(allClients);
  const [clients, setClients] = useState([]); //empty array

  //delete todo function

  // async function getTodos() {
  //   const res = await fetch("http://localhost:5000/todos");

  //   const todoArray = await res.json();

  //   setTodos(todoArray);
  // }

  useEffect(() => {
    setClients(allClients);
  }, [allClients]);

  console.log(clients);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr>
             <th>Nombre</th>
             <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {clients.length !== 0 &&
            clients[0].client_id !== null &&
            clients.map(client => (
              <tr key={client.client_id}>
                 <td>{client.client_name}</td>
                 <td>{client.client_email}</td>
                <td>
                  <EditClient client={client} setClientsChange={setClientsChange} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListClients;