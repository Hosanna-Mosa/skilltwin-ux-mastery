const Expert = require("../models/Expert");

exports.getExperts = async (req, res) => {
  try {
    const experts = await Expert.find();
    res.json(experts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createExpert = async (req, res) => {
  try {
    const { name, skills, availability } = req.body;
    const expert = new Expert({ name, skills, availability });
    await expert.save();
    res.status(201).json(expert);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateExpert = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, skills, availability } = req.body;
    const expert = await Expert.findByIdAndUpdate(
      id,
      { name, skills, availability },
      { new: true }
    );
    res.json(expert);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteExpert = async (req, res) => {
  try {
    const { id } = req.params;
    await Expert.findByIdAndDelete(id);
    res.json({ message: "Expert deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
