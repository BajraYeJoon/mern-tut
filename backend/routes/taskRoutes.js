//initialize the  server using express

const express = require("express");

const {
  getTasks,
  setTasks,
  putTasks,
  delTasks,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

//initialize a new router with express.Router
const router = express.Router();

//make a common route with method({modules})
//Routers for CRUD
router.route("/").get(protect, getTasks).post(protect, setTasks);
router.route("/:id").put(protect, putTasks).delete(protect, delTasks);

module.exports = router;
