import React, { Fragment, useState } from "react";

const InputMessage = ({ setMessagesChange }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { email, message };
      const response = await fetch("http://localhost:5000/messages/clientmessages", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      setMessagesChange(true);
      setEmail("");
      setMessage("");
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <h3 className="text-left my-4">Responder un mensaje</h3>
      <form className="d-flex" onSubmit={onSubmitForm}>
        <div className="form-row">
          <div className="col">
            <input
              type="text"
              placeholder="Email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            </div>
            <div className="col">
            <input
            type="text"
            placeholder="Mensaje"
            className="form-control"
            value={message}
            onChange={e => setMessage(e.target.value)}
            />
            </div>
          </div>
        <button className="btn btn-success ">Añadir</button>
      </form>
    </Fragment>
  );
};

export default InputMessage;
