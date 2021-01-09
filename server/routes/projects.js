const express = require("express");
const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");
const bcrypt = require("bcrypt");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");

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

module.exports = router;