const express = require("express");
const { assignTask, getTasks } = require("../controllers/taskController");
const { authenticateJWT, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/assign-task", authenticateJWT, isAdmin, assignTask);
router.get("/", authenticateJWT, isAdmin, getTasks);

module.exports = router;
