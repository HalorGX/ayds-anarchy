const express = require("express");
const app = express();
const cors = require("cors");

//middleware

app.use(cors());
app.use(express.json());

//routes

app.use("/authentication", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/clients", require("./routes/clients"));
app.use("/freelancers", require("./routes/freelancers"));
app.use("/messages", require("./routes/messages"));
app.use("/projects", require("./routes/projects"));

app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
