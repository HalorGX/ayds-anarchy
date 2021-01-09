import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";
import 'bootstrap/dist/css/bootstrap.min.css';

const ListTodos = ({ allTodos, setTodosChange }) => {
  console.log(allTodos);
  const [todos, setTodos] = useState([]); //empty array

  //delete todo function

  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:5000/freelancers/freelancers/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token }
      });
      window.location.reload();
      setTodos(todos);
    } catch (err) {
      console.error(err.message);
    }
  }

/*  async function selectTodo(id) {
    try {
      await fetch(`http://localhost:5000/dashboard/chosenFreelancers`, {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });
      setTodos(todos);
    } catch (err) {
      console.error(err.message);
    }
  } */

  // async function getTodos() {
  //   const res = await fetch("http://localhost:5000/todos");

  //   const todoArray = await res.json();

  //   setTodos(todoArray);
  // }

  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

  console.log(todos);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr>
             <th>Nombre</th>
             <th>Orden</th>
             <th>Calidad</th>
             <th>Puntualidad</th>
             <th>Idioma</th>
             <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {todos.length !== 0 &&
            todos[0].freelancer_id !== null &&
            todos.map(todo => (
              <tr key={todo.freelancer_id}>
                 <td>{todo.name}</td>
                 <td>{todo.orden}</td>
                 <td>{todo.calidad}</td>
                 <td>{todo.puntualidad}</td>
                 <td>{todo.idioma}</td>
                <td>
                  <EditTodo todo={todo} setTodosChange={setTodosChange} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.freelancer_id)}
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

export default ListTodos;
