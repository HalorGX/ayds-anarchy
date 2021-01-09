const express = require("express");
const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");
const bcrypt = require("bcrypt");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");

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