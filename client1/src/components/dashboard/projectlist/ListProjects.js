import React, { Fragment, useState, useEffect } from "react";
import ScheduleProject from "./ScheduleProject";
import BudgetProject from "./BudgetProject";

const ListProjects = ({ allProjects, setProjectsChange }) => {
  console.log(allProjects);
  const [projects, setProjects] = useState([]); //empty array

  // async function getTodos() {
  //   const res = await fetch("http://localhost:5000/todos");

  //   const todoArray = await res.json();

  //   setTodos(todoArray);
  // }

  async function deleteProject(id) {
    try {
      await fetch(`http://localhost:5000/projects/projects/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token }
      });
      window.location.reload();
      setProjects(projects);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    setProjects(allProjects);
  }, [allProjects]);

  console.log(projects);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr>
             <th>ID Proyecto</th>
             <th>Nombre del Cliente</th>
             <th>Petición</th>
             <th>Presupuesto</th>
             <th></th>
             <th>Reunión</th>
          </tr>
        </thead>
        <tbody>
          {projects.length !== 0 &&
            projects[0].project_id !== null &&
            projects.map(project => (
              <tr key={project.project_id}>
                 <td>{project.project_id}</td>
                 <td>{project.client_name}</td>
                 <td>{project.description}</td>
                 <td>{project.budget}</td>
                 <td>
                  <BudgetProject project={project} setProjectsChange={setProjectsChange} />
                </td>
                 <td>
                  <ScheduleProject project={project} setProjectsChange={setProjectsChange} />
                </td>
                 <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteProject(project.project_id)}
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

export default ListProjects;
