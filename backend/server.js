//initialize the server using express
const express = require("express");
const colors = require("colors");
const { connectDB } = require("./config/db");

//bring in error handler
const { errHandler } = require("./middleware/errorMiddleware");

//initialize the dotenv for the environment variables
const dotenv = require("dotenv").config();

//specify the port using the process .env
const port = process.env.PORT || 5000;

//method for connection of db

connectDB();
//make an app using the express server
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//middleware -use with the api endpoint and make a route folder with the routes that handles the crud
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
