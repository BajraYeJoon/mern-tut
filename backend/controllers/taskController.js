// //make controller function with const function name = (req, res) => {
// res.status(200).json({ mesage})

//

///@desc getTasks
//@route  GET /API/TASKS
//@access Private
const getTasks = (req, res) => {
  res.status(200).json({ message: "get task" });
};

///@desc setTasks
//@route  POST /API/TASKS
//@access Private
const setTasks = (req, res) => {
  res.status(200).json({ message: "set task" });
};

///@desc updateTasks
//@route  PUT /API/TASK/id
//@access Private
const putTasks = (req, res) => {
  res.status(200).json({ mesage: `Update task ${req.params.id}` });
};

///@desc deleteTasks
//@route  DELETE /API/TASKS
//@access Private
const delTasks = (req, res) => {
  res.status(200).json({ mesage: `delete task ${req.params.id}` });
};

module.exports = {
  getTasks,
  setTasks,
  putTasks,
  delTasks,
};
