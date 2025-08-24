const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/tasks', async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});

// Add task
router.post('/tasks', async (req, res) => {
  const { title, priority } = req.body;
  const task = new Task({ title, priority });
  await task.save();
  res.json(task);
});

// Update task (title, priority, status)
router.put('/tasks/:id', async (req, res) => {
  const { title, priority, status } = req.body;
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { title, priority, status },
    { new: true }
  );
  res.json(task);
});

// Soft delete task
// Soft delete task
router.put('/tasks/delete/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: 'Deleted' }, // mark as deleted
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
