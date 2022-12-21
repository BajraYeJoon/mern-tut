// //make controller function with const function name = (req, res) => {
// res.status(200).json({ mesage})

//async handler for custom error handling during db connecction
const asyncHandler = require("express-async-handler");

//getting the model

const Task = require("../models/taskModel");
const User = require("../models/userModel");

///@desc getTasks
//@route  GET /API/TASKS
//@access Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });

  res.status(200).json(tasks);
});

///@desc setTasks
//@route  POST /API/TASKS
//@access Private
const setTasks = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("add text field");
  }

  const task = await Task.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(task);
});

///@desc updateTasks
//@route  PUT /API/TASK/id
//@access Private
const putTasks = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error("task not found");
  }

  const user = await User.findById(req.user.id);

  //check for user
  if (!user) {
    res.status(401);
    throw new Error("no user");
  }

  //check if the users with user id can only update the task
  if (task.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user is not authorized");
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTask);
});

///@desc deleteTasks
//@route  DELETE /API/TASKS
//@access Private
const delTasks = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error("task not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  //checking user === user
  if (task.user.toString() !== user.id) {
    res.status(401);
    throw new Error("you are not authorized");
  }

  await task.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTasks,
  setTasks,
  putTasks,
  delTasks,
};
