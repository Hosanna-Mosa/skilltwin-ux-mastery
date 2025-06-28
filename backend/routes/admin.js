const express = require("express");
const { getLeads, getEnrollments } = require("../controllers/adminController");
const { authenticateJWT, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/leads", authenticateJWT, isAdmin, getLeads);
router.get("/enrollments", authenticateJWT, isAdmin, getEnrollments);

module.exports = router;
