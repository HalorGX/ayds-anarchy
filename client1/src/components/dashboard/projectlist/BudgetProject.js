import React, { Fragment, useState } from "react";

const BudgetProject = ({ project, setProjectsChange }) => {
  //editText function

  const editText = async id => {
    try {
      const body = { budget };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`http://localhost:5000/projects/budget/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      setProjectsChange(true);

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
      
    }
  };

  const [budget, setBudget] = useState(project.budget);

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${project.project_id}`}
      >
        Asignar presupuesto
      </button>
      <div
        className="modal"
        id={`id${project.project_id}`}
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
              <h4 className="modal-title">Asignar presupuesto</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => {
                  setBudget(project.budget);
                }}>
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Presupuesto"
                value={budget}
                onChange={e => setBudget(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={() => editText(project.project_id)}
              >
                Confirmar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => {
                  setBudget(project.budget);
                }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BudgetProject;
