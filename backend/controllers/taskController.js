const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const rows = await Task.getAll();
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTask = async (req, res) => {
  try {
    const row = await Task.getById(req.params.id);
    res.status(200).json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  const { title, description, dueDate, status } = req.body;

  if (!title || !dueDate || !description) {
    return res.status(400).json({ error: 'Missing are required' });
  }

  try {
    const result = await Task.create(req.body);
    res.status(201).json({ id: result.lastID, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const result = await Task.update(req.params.id, req.body);
    res.status(200).json({ updated: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const result = await Task.delete(req.params.id);
    res.status(200).json({ deleted: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchTask = async (req, res) => {
  try {
    const rows = await Task.search(req.query.q);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
