const Task = require("../models/Task");
const asyncHandler = require("../utils/asyncHandler");

const getTasks = asyncHandler(async (req, res, next) => {
  const tasks = await Task.find();
  return res.send(tasks);
});

const createTask = asyncHandler(async (req, res, next) => {
  const taskObj = req.body;
  const newTask = new Task(taskObj);
  await newTask.save();
  return res.status(200).json(newTask);
});

const updateStatus = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { status } = req.body;
  await Task.findByIdAndUpdate(id, { status }, { new: true });
  return res.status(200).json({ message: "Status has been updated" });
});

const deleteTask = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  await Task.findByIdAndDelete(id);
  return res.status(200).json({ message: "Task has been deleted" });
});

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  updateStatus,
};
