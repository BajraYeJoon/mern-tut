// //make controller function with const function name = (req, res) => {
// res.status(200).json({ mesage})

//async handler for custom error handling during db connecction
const asyncHandler = require("express-async-handler");

//getting the model

const Task = require("../models/taskModel");

///@desc getTasks
//@route  GET /API/TASKS
//@access Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();

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
  await task.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTasks,
  setTasks,
  putTasks,
  delTasks,
};
