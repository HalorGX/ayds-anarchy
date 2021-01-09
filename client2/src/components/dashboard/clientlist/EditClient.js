import React, { Fragment, useState } from "react";

const EditClient = ({ client, setClientsChange }) => {
  //editText function

  const editText = async id => {
    try {
      const body = { name,email,password };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`http://localhost:5000/clients/clients/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      setClientsChange(true);

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
      
    }
  };

  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [password, setPassword] = useState(client.password);

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${client.client_id}`}
      >
        Editar
      </button>
      <div
        className="modal"
        id={`id${client.client_id}`}
 /*       onClick={() => {
           setName(todo.name);
           setOrden(todo.orden);
           setCalidad(todo.calidad);
           setPuntualidad(todo.puntualidad);
           setIdioma(todo.idioma);
         }}*/>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Editar datos del cliente</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => {
                  setName(client.name);
                  setEmail(client.email);
                  setPassword(client.password);
                }}>
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Correo electrónico"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={() => editText(client.client_id)}
              >
                Confirmar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => {
                  setName(client.name);
                  setEmail(client.email);
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditClient;
