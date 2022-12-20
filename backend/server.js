//initialize the server using express
const express = require("express");

//initialize the dotenv for the environment variables
const dotenv = require("dotenv").config();

//specify the port using the process .env
const port = process.env.PORT || 3000;

//make an app using the express server
const app = express();

//middleware -use with the api endpoint and make a route folder with the routes that handles the crud
app.use("/api/tasks", require("./routes/taskRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
