const SessionLog = require("../models/SessionLog");

exports.addSessionLog = async (req, res) => {
  try {
    const { enrollmentId, sessionDate, notes, status, progress } = req.body;
    const sessionLog = new SessionLog({
      enrollmentId,
      sessionDate,
      notes,
      status,
      progress,
    });
    await sessionLog.save();
    res.status(201).json(sessionLog);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateSessionLog = async (req, res) => {
  try {
    const { id } = req.params;
    const { sessionDate, notes, status, progress } = req.body;
    const sessionLog = await SessionLog.findByIdAndUpdate(
      id,
      { sessionDate, notes, status, progress },
      { new: true }
    );
    res.json(sessionLog);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSessionLogs = async (req, res) => {
  try {
    const { enrollmentId } = req.query;
    const logs = await SessionLog.find(enrollmentId ? { enrollmentId } : {});
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
