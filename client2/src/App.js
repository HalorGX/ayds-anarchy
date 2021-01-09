import React, { Fragment, useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  
} from "react-router-dom";

import { toast } from "react-toastify";

import background from "./background.jpg";

//components

import Login from "./components/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Landing from "./components/Landing";
import Projects from "./components/dashboard/Projects";
import Clients from "./components/dashboard/Clients";
import Home from "./components/dashboard/Home";
import Messages from "./components/dashboard/Messages";


toast.configure();

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/authentication/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <div style={{backgroundImage:`url(${background})`, backgroundSize: 'cover' , backgroundPosition: 'center'}}>
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={props =>
                !isAuthenticated ? (
                  <Landing {...props} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/login"
              render={props =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/home" />
                )
              }
            />
            <Route
              exact
              path="/home"
              render={props =>
                isAuthenticated ? (
                  <Home {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={props =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/projects"
              render={props =>
                isAuthenticated ? (
                  <Projects {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/clients"
              render={props =>
                isAuthenticated ? (
                  <Clients {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/messages"
              render={props =>
                isAuthenticated ? (
                  <Messages {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
    </div>
  );
}

export default App;
