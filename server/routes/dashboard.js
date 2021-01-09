const express = require("express");
const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");
const bcrypt = require("bcrypt");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");


/////////////////////////////
/*           TODOS         */
/////////////////////////////

//all todos and name

router.get("/", authorize, async (req, res) => {
  try {
    // const user = await pool.query(
    //   "SELECT user_name FROM users WHERE user_id = $1",
    //   [req.user.id]
    // );

    const user = await pool.query(
      "SELECT freelancer_id, name, orden, calidad, puntualidad, idioma FROM freelancers"
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//create a todo

router.post("/todos", authorize, async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *",
      [req.user.id, description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

router.put("/todos/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *",
      [description, id, req.user.id]
    );

    if (updateTodo.rows.length === 0) {
      return res.json("This todo is not yours");
    }

    res.json(updateTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

router.delete("/todos/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );
    res.json(deleteTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});


/////////////////////////////
/*        FREELANCERS      */
/////////////////////////////

//create a freelancer

router.post("/freelancers", authorize, async(req,res) =>{
  try {
      console.log(req.body);
      const { name, orden, calidad, puntualidad, idioma } = req.body;
      const newFreelancer = await pool.query("INSERT INTO freelancers (user_id, name, orden, calidad, puntualidad, idioma) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", 
      [req.user.id,name,orden,calidad,puntualidad,idioma]
      );
      res.json(newFreelancer.rows[0]);
  } catch(err){
      console.error(err.message);
  }
});


//get all freelancers

router.get("/freelancers", authorize, async (req, res) => {
  try {
      const allFreelancers = await pool.query("SELECT * FROM freelancers");
      res.json(allFreelancers.rows);
  } catch (err) {
      console.error(err.message);
  }
})

//get a freelancer

router.get("/frelancers/:id", authorize, async (req, res) => {
  try {
      const {id} = req.params;
      const freelancer = await pool.query("SELECT * FROM freelancers WHERE freelancer_id = $1", [id]);

      res.json(freelancer.rows[0]);
  } catch (err) {
      console.error(err.message);
  }
});

//update a freelancer

router.put("/freelancers/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, orden, calidad, puntualidad, idioma  } = req.body;
    const updateFreelancer = await pool.query(
      "UPDATE freelancers SET name = $1, orden = $2, calidad = $3, puntualidad = $4, idioma = $5 WHERE freelancer_id = $6 RETURNING *",
      [name, orden, calidad, puntualidad, idioma, id]
    );
    res.json(updateFreelancer.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a freelancer

router.delete("/freelancers/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteFreelancer = await pool.query(
      "DELETE FROM freelancers WHERE freelancer_id = $1 RETURNING *",
      [id]
    );

    res.json(deleteFreelancer.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//select freelancer (pendiente)

router.post("/chosenFreelancers", authorize, async (req, res) => {
  try {
    console.log(req.body);
    const { name, orden, calidad, puntualidad, idioma  } = req.body;
    const selectFreelancer = await pool.query(
      "INSERT INTO chosenFreelancers (user_id, name, orden, calidad, puntualidad, idioma) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [req.user.id, name, orden, calidad, puntualidad, idioma]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


/////////////////////////////
/*        PROJECTS         */
/////////////////////////////


//get all projects

router.get("/projects", authorize, async (req, res) => {
  try {

    const user = await pool.query(
      "SELECT project_id, client_name, description, budget FROM projects"
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//create a project

router.post("/projects", authorize, async(req,res) =>{
  try {
      console.log(req.body);
      const { description } = req.body;
      const newProject = await pool.query("INSERT INTO projects (client_name, description) VALUES($1, $2) RETURNING *", 
      [req.user.name,description]
      );
      res.json(newProject.rows[0]);
  } catch(err){
      console.error(err.message);
  }
});

//get a project

router.get("/projects/:id", authorize, async (req, res) => {
  try {
      const {id} = req.params;
      const project = await pool.query("SELECT * FROM projects WHERE project_id = $1", [id]);

      res.json(project.rows[0]);
  } catch (err) {
      console.error(err.message);
  }
});

//update a project

router.put("/projects/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, orden, calidad, puntualidad, idioma } = req.body;
    const updateFreelancer = await pool.query(
      "UPDATE projects SET name = $1, orden = $2, calidad = $3, puntualidad = $4, idioma = $5 WHERE project_id = $6 RETURNING *",
      [name, orden, calidad, puntualidad, idioma, id]
    );
    res.json(updateFreelancer.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//schedule a project

router.post("/schedule/:id", authorize, async(req,res) =>{
  try {
      console.log(req.body);
      const { id } = req.params;
      const { año, mes, dia, hora, minuto } = req.body;
      const newSchedule = await pool.query("INSERT INTO scheduleProjects (project_id, año, mes, dia, hora, minuto) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", 
      [id, año, mes, dia, hora, minuto]
      );
      res.json(newSchedule.rows[0]);
  } catch(err){
      console.error(err.message);
  }
});

//budget project

router.put("/budget/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { budget } = req.body;
    const updateBudget = await pool.query(
      "UPDATE projects SET budget = $1 WHERE project_id = $2 RETURNING *",
      [budget, id]
    );
    res.json(updateBudget.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a project

router.delete("/projects/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProject = await pool.query(
      "DELETE FROM projects WHERE project_id = $1 RETURNING *",
      [id]
    );

    res.json(deleteProject.rows);
  } catch (err) {
    console.error(err.message);
  }
});


/////////////////////////////
/*         CLIENTS         */
/////////////////////////////

//get all clients

router.get("/clients", authorize, async (req, res) => {
  try {
    // const user = await pool.query(
    //   "SELECT user_name FROM users WHERE user_id = $1",
    //   [req.user.id]
    // );

    const user = await pool.query(
      "SELECT client_id, client_name, client_email FROM clients"
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/clients", validInfo, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM clients WHERE client_email = $1", [
      email
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      "INSERT INTO clients (client_name, client_email, client_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].client_id);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//create a client

/*router.post("/clients", authorize, async(req,res) =>{
  try {
      console.log(req.body);
      const { name, email } = req.body;
      const newClient = await pool.query("INSERT INTO clients (client_name, client_email) VALUES($1, $2) RETURNING *", 
      [name,email]
      );
      res.json(newClient.rows[0]);
  } catch(err){
      console.error(err.message);
  }
});*/

//get a client

router.get("/clients/:id", authorize, async (req, res) => {
  try {
      const {id} = req.params;
      const client = await pool.query("SELECT * FROM clients WHERE client_id = $1", [id]);

      res.json(client.rows[0]);
  } catch (err) {
      console.error(err.message);
  }
});

//update a client

router.put("/clients/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const updateClient = await pool.query(
      "UPDATE clients SET client_name = $1, client_email = $2 WHERE client_id = $3 RETURNING *",
      [name, email, id]
    );
    res.json(updateClient.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a client

router.delete("/clients/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteClient = await pool.query(
      "DELETE FROM clients WHERE client_id = $1 RETURNING *",
      [id]
    );

    res.json(deleteClient.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/clientprojects", authorize, async (req, res) => {
  try {
    // const user = await pool.query(
    //   "SELECT user_name FROM users WHERE user_id = $1",
    //   [req.user.id]
    // );

    const user = await pool.query(
      "SELECT p.project_id, c.client_name, p.description, p.budget FROM clients AS c LEFT JOIN projects AS p ON c.client_name = p.client_name WHERE c.client_id = $1",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/clientdata", authorize, async (req, res) => {
  try {
    // const user = await pool.query(
    //   "SELECT user_name FROM users WHERE user_id = $1",
    //   [req.user.id]
    // );

    const user = await pool.query(
      "SELECT client_name, client_email, client_password FROM clients WHERE client_id = $1",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


/////////////////////////////
/*         MESSAGES        */
/////////////////////////////

router.get("/messages", authorize, async (req, res) => {
  try {

    const user = await pool.query(
      "SELECT client_email, message, received FROM messages WHERE received = 'cliente'",
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/messages", authorize, async(req,res) =>{
  try {
      console.log(req.body);
      const { message, email } = req.body;
      const newMessage = await pool.query("INSERT INTO messages (message, user_id, user_name, user_email, client_email, received) VALUES($1, $2, $3, $4, $5, 'usuario') RETURNING *", 
      [message, req.user.id, req.user.name, req.user.email, email]
      );
      res.json(newMessage.rows[0]);
  } catch(err){
      console.error(err.message);
  }
});

router.get("/clientmessages", authorize, async (req, res) => {
  try {
    // const user = await pool.query(
    //   "SELECT user_name FROM users WHERE user_id = $1",
    //   [req.user.id]
    // );

    const user = await pool.query(
      "SELECT user_email, message FROM messages WHERE received = 'usuario'",
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/clientmessages", authorize, async(req,res) =>{
  try {
      console.log(req.body);
      const { message, email } = req.body;
      const newMessage = await pool.query("INSERT INTO messages (message, client_id, client_name, client_email, user_email, received) VALUES($1, $2, $3, $4, $5, 'cliente') RETURNING *", 
      [message, req.user.id, req.user.name, req.user.email, email]
      );
      res.json(newMessage.rows[0]);
  } catch(err){
      console.error(err.message);
  }
});

module.exports = router;