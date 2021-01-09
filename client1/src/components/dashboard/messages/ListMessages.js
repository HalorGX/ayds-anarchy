import React, { Fragment, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const ListMessages = ({ allMessages, setMessagesChange }) => {
  console.log(allMessages);
  const [messages, setMessages] = useState([]); //empty array

  useEffect(() => {
    setMessages(allMessages);
  }, [allMessages]);

  console.log(messages);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr>
             <th>Enviado por</th>
             <th>Mensaje</th>
          </tr>
        </thead>
        <tbody>
          {messages.length !== 0 &&
            messages[0].message_id !== null &&
            messages.map(message => (
              <tr key={message.message_id}>
                 <td>{message.client_email}</td>
                 <td>{message.message}</td>
                <td>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListMessages;
