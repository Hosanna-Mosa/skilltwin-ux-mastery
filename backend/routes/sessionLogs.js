const express = require("express");
const {
  addSessionLog,
  updateSessionLog,
  getSessionLogs,
} = require("../controllers/sessionLogController");
const { authenticateJWT, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/", authenticateJWT, isAdmin, addSessionLog);
router.put("/:id", authenticateJWT, isAdmin, updateSessionLog);
router.get("/", authenticateJWT, isAdmin, getSessionLogs);

module.exports = router;
