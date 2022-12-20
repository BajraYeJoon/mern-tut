//initialize the server using express
const express = require("express");

//bring in error handler
const { errHandler } = require("./middleware/errorMiddleware");

//initialize the dotenv for the environment variables
const dotenv = require("dotenv").config();

//specify the port using the process .env
const port = process.env.PORT || 3000;

//make an app using the express server
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//middleware -use with the api endpoint and make a route folder with the routes that handles the crud
app.use("/api/tasks", require("./routes/taskRoutes"));

app.use(errHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
