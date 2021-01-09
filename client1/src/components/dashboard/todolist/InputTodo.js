import React, { Fragment, useState } from "react";

const InputTodo = ({ setTodosChange }) => {
  const [name, setName] = useState("");
  const [orden, setOrden] = useState("");
  const [calidad, setCalidad] = useState("");
  const [puntualidad, setPuntualidad] = useState("");
  const [idioma, setIdioma] = useState("Idioma");


  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { name,orden,calidad,puntualidad,idioma };
      const response = await fetch("http://localhost:5000/freelancers/freelancers", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      setTodosChange(true);
      setName("");
      setOrden("");
      setCalidad("");
      setPuntualidad("");
      setIdioma("");
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <h3 className="text-left my-4">Añade un freelancer</h3>
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
            placeholder="Orden (0 - 100)"
            className="form-control"
            value={orden}
            onChange={e => setOrden(e.target.value)}
            />
            </div>
            <div className="col">
            <input
            type="text"
            placeholder="Calidad (0 - 100)"
            className="form-control"
            value={calidad}
            onChange={e => setCalidad(e.target.value)}
            />
            </div>
            <div className="col">
            <input
            type="text"
            placeholder="Puntualidad (0 - 100)"
            className="form-control"
            value={puntualidad}
            onChange={e => setPuntualidad(e.target.value)}
            />
            </div>
            <div className="col">
            <select value={idioma} onChange={e => setIdioma(e.target.value)} className="custom-select my-1 mr-sm-2">
              <option disabled>Idioma</option>
              <option value="Inglés">Inglés</option>
              <option value="Español">Español</option>
            </select>
          </div>
        </div>
        <button className="btn btn-success ">Añadir</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
