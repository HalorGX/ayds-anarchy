const express = require("express");
const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");
const bcrypt = require("bcrypt");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");

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

module.exports = router;