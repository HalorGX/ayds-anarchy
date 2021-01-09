import React, { Fragment, useState } from "react";

const InputProject = ({ setProjectsChange }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { name, description };
      const response = await fetch("http://localhost:5000/projects/projects", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      setProjectsChange(true);
      setName("");
      setDescription("");
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <h3 className="text-left my-4">Añade un proyecto</h3>
      <form className="d-flex" onSubmit={onSubmitForm}>
        <div>
            <input
            type="text"
            placeholder="Descripción"
            className="form-control"
            value={description}
            onChange={e => setDescription(e.target.value)}
            />
        </div>
        <button className="btn btn-success ">Añadir</button>
      </form>
    </Fragment>
  );
};

export default InputProject;
