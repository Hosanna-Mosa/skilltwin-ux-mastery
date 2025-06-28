const Task = require("../models/Task");

exports.assignTask = async (req, res) => {
  try {
    const { inquiryId, expertId } = req.body;
    const task = new Task({ inquiryId, expertId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("inquiryId").populate("expertId");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
