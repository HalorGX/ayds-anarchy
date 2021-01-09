import React, { Fragment, useState } from "react";

const MessageClient = ({ client, setClientsChange }) => {
  //editText function

  const editText = async id => {
    try {
      const body = { message };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`http://localhost:5000/messages/messages`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      setClientsChange(true);

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
      
    }
  };

  const [message, setMessage] = useState(client.message);
  const [name, setName] = useState(client.name);

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${client.client_id}`}
      >
        Enviar mensaje
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
              <h4 className="modal-title">Enviar mensaje al cliente</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => {
                  setMessage(client.message);
                  setName(client.name);
                }}>
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Mensaje"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={() => editText(client.client_id)}
              >
                Enviar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => {
                  setMessage(client.message);
                  setName(client.name);
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

export default MessageClient;
