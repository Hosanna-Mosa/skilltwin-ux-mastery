const express = require("express");
const {
  getExperts,
  createExpert,
  updateExpert,
  deleteExpert,
} = require("../controllers/expertController");
const { authenticateJWT, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticateJWT, isAdmin, getExperts);
router.post("/", authenticateJWT, isAdmin, createExpert);
router.put("/:id", authenticateJWT, isAdmin, updateExpert);
router.delete("/:id", authenticateJWT, isAdmin, deleteExpert);

module.exports = router;
