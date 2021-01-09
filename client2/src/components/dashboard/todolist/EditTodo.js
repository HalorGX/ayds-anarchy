import React, { Fragment, useState } from "react";

const EditTodo = ({ todo, setTodosChange }) => {
  //editText function

  const editText = async id => {
    try {
      const body = { name,orden,calidad,puntualidad,idioma};

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`http://localhost:5000/freelancers/freelancers/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      setTodosChange(true);

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
      
    }
  };

  const [name, setName] = useState(todo.name);
  const [orden, setOrden] = useState(todo.orden);
  const [calidad, setCalidad] = useState(todo.calidad);
  const [puntualidad, setPuntualidad] = useState(todo.puntualidad);
  const [idioma, setIdioma] = useState(todo.idioma);
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.freelancer_id}`}
      >
        Editar
      </button>
      <div
        className="modal"
        id={`id${todo.freelancer_id}`}
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
              <h4 className="modal-title">Editar datos del freelancer</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => {
                  setName(todo.name);
                  setOrden(todo.orden);
                  setCalidad(todo.calidad);
                  setPuntualidad(todo.puntualidad);
                  setIdioma(todo.idioma);
                }}>
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                value={orden}
                onChange={e => setOrden(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                value={calidad}
                onChange={e => setCalidad(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                value={puntualidad}
                onChange={e => setPuntualidad(e.target.value)}
              />
              <select value={idioma} onChange={e => setIdioma(e.target.value)} className="custom-select my-1 mr-sm-2">
                <option disabled>Idioma</option>
                <option value="Inglés">Inglés</option>
                <option value="Español">Español</option>
              </select>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={() => editText(todo.freelancer_id)}
              >
                Confirmar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => {
                  setName(todo.name);
                  setOrden(todo.orden);
                  setCalidad(todo.calidad);
                  setPuntualidad(todo.puntualidad);
                  setIdioma(todo.idioma);
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

export default EditTodo;
