// //make controller function with const function name = (req, res) => {
// res.status(200).json({ mesage})

//async handler for custom error handling during db connecction
const asyncHandler = require("express-async-handler");

///@desc getTasks
//@route  GET /API/TASKS
//@access Private
const getTasks = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get task" });
});

///@desc setTasks
//@route  POST /API/TASKS
//@access Private
const setTasks = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("add text field");
  }

  res.status(200).json({ message: "set task" });
});

///@desc updateTasks
//@route  PUT /API/TASK/id
//@access Private
const putTasks = asyncHandler(async (req, res) => {
  res.status(200).json({ mesage: `Update task ${req.params.id}` });
});

///@desc deleteTasks
//@route  DELETE /API/TASKS
//@access Private
const delTasks = asyncHandler(async (req, res) => {
  res.status(200).json({ mesage: `delete task ${req.params.id}` });
});

module.exports = {
  getTasks,
  setTasks,
  putTasks,
  delTasks,
};
