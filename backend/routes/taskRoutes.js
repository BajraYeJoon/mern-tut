//initialize the  server using express

const express = require("express");

const {
  getTasks,
  setTasks,
  putTasks,
  delTasks,
} = require("../controllers/taskController");

//initialize a new router with express.Router
const router = express.Router();

//make a common route with method({modules})
//Routers for CRUD
router.route("/").get(getTasks).post(setTasks);
router.route("/:id").put(putTasks).delete(delTasks);

module.exports = router;
