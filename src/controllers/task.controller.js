const Task = require("../models/task.model");
const User = require("../models/user.model");
const { Types } = require('mongoose');

async function getTasks(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const tasks = await Task.find();
    if (!tasks) {
      res.status(404).json({ message: "Tasks not found" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error finding tasks." });
  }
}

async function getMyTask(req, res) {
  try {
    const user = await User.findById(res.locals.user.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const tasks = await Task.find();
    if (!tasks) {
      res.status(404).json({ message: "Tasks not found" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error finding tasks." });
  }
}

async function createMyTask(req, res) {
  try {
    const user = await User.findById(res.locals.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const newTask = await Task.create({
      task: req.body.task,
      time: req.body.time,
      userId: res.locals.user.id,
    });
    user.tasks.push(newTask);
    await user.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating task." });
  }
}

async function createTask(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const newTask = await Task.create({
      task: req.body.task,
      time: req.body.time,
      userId: req.params.id,
    });
    user.tasks.push(newTask);
    await user.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating task." });
  }
}

async function updateMyTask(req, res) {
  try {
    const user = await User.findById(res.locals.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updateTask = await Task.findByIdAndUpdate(req.body._id, {
      task: req.body.task,
      time: req.body.time,
    });
    if (!updateTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    user.tasks.push(updateTask);
    await user.save();

    res.status(201).json(updateTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating task." });
  }
}

async function updateTask(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updateTask = await Task.findByIdAndUpdate(req.body._id, {
      task: req.body.task,
      time: req.body.time,
    });
    if (!updateTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    user.tasks.push(updateTask);
    await user.save();

    res.status(201).json(updateTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating task." });
  }
}

async function deleteMyTask(req, res) {
  try {
    const user = await User.findById(res.locals.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const deleteTask = await Task.findById(req.body.id)
    if (!deleteTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (deleteTask.userId.toString() !== res.locals.user.id.toString()) {
      return res.status(500).json({ message: "You can't delete this task" });
    }
    await Task.deleteOne({ _id: req.body.id });
    return res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Task delete failed"})
  }
}

async function deleteTask(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const deleteTask = await Task.findById(req.body.id)
    if (!deleteTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    await Task.deleteOne({ _id: req.body.id });
    return res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Task delete failed"})
  }
}


module.exports = {
  getTasks,
  createMyTask,
  getMyTask,
  createTask,
  updateMyTask,
  updateTask,
  deleteMyTask,
  deleteTask
};
