import React, { Fragment, useState, useEffect } from "react";

const ListProjects = ({ allProjects, setProjectsChange }) => {
  console.log(allProjects);
  const [projects, setProjects] = useState([]); //empty array

  // async function getTodos() {
  //   const res = await fetch("http://localhost:5000/todos");

  //   const todoArray = await res.json();

  //   setTodos(todoArray);
  // }

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
             <th>Petición</th>
             <th>Presupuesto</th>
          </tr>
        </thead>
        <tbody>
          {projects.length !== 0 &&
            projects[0].project_id !== null &&
            projects.map(project => (
              <tr key={project.project_id}>
                 <td>{project.project_id}</td>
                 <td>{project.description}</td>
                 <td>{project.budget}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListProjects;
