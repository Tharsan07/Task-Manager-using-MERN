const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Deleted'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
