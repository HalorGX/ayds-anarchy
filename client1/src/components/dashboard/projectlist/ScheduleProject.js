import React, { Fragment, useState } from "react";

const ScheduleProject = ({ project, setProjectsChange }) => {
  //editText function

  const editText = async id => {
    try {
      const body = { año, mes, dia, hora, minuto };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`http://localhost:5000/projects/schedule/${id}`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      setProjectsChange(true);

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
      
    }
  };

  const [año, setAño] = useState(project.año);
  const [mes, setMes] = useState(project.mes);
  const [dia, setDia] = useState(project.dia);
  const [hora, setHora] = useState(project.hora);
  const [minuto, setMinuto] = useState(project.minuto);
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${project.project_id}`}
      >
        Agendar
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
              <h4 className="modal-title">Agendar reunión</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => {
                  setAño(project.año);
                  setMes(project.mes);
                  setDia(project.dia);
                  setHora(project.hora);
                  setMinuto(project.minuto);
                }}>
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Año"
                value={año}
                onChange={e => setAño(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Mes"
                value={mes}
                onChange={e => setMes(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Día"
                value={dia}
                onChange={e => setDia(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Hora"
                value={hora}
                onChange={e => setHora(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Minuto"
                value={minuto}
                onChange={e => setMinuto(e.target.value)}
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
                  setAño(project.año);
                  setMes(project.mes);
                  setDia(project.dia);
                  setHora(project.hora);
                  setMinuto(project.minuto);
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

export default ScheduleProject;
