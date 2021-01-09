const express = require("express");
const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");
const bcrypt = require("bcrypt");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");

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

module.exports = router;