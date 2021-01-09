import React, { Fragment, useState } from "react";

const InputClient = ({ setClientsChange }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { name, email, password };
      const response = await fetch("http://localhost:5000/clients/clients", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      setClientsChange(true);
      setName("");
      setEmail("");
      setPassword("");
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <h3 className="text-left my-4">Añade un cliente</h3>
      <form className="d-flex" onSubmit={onSubmitForm}>
        <div className="form-row">
          <div className="col">
            <input
              type="text"
              placeholder="Nombre"
              className="form-control"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            </div>
            <div className="col">
            <input
            type="text"
            placeholder="Correo electrónico"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
            </div>
            <div className="col">
            <input
            type="text"
            placeholder="Contraseña"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
            </div>
        </div>
        <button className="btn btn-success ">Añadir</button>
      </form>
    </Fragment>
  );
};

export default InputClient;
