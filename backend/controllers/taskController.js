const Task = require('../models/Task');

// Get tasks, optionally filter by priority
// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); // make sure this returns all fields including status
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Create task
exports.createTask = async (req, res) => {
  try {
    const { title, priority, dueDate, status } = req.body;
    const newTask = new Task({ title, priority, dueDate, status });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, priority, dueDate, status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, priority, dueDate, status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) return res.status(404).json({ message: "Task not found" });

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
