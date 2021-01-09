import React, { Fragment, useState, useEffect } from "react";

const ListClients = ({ allClients, setClientsChange }) => {
  console.log(allClients);
  const [clients, setClients] = useState([]); //empty array

  //delete todo function

  async function deleteClient(id) {
    try {
      await fetch(`http://localhost:5000/clients/clients/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token }
      });
      window.location.reload();
      setClients(clients);
    } catch (err) {
      console.error(err.message);
    }
  }

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
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteClient(client.client_id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListClients;