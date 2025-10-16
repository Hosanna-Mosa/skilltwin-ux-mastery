const express = require("express");
const { body } = require("express-validator");
const {
  createBlog,
  getBlogs,
  getBlogByIdOrSlug,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();

const baseValidators = [
  body("title").isString().trim().isLength({ min: 3 }).withMessage("Title required"),
  body("slug").isString().trim().isLength({ min: 3 }).withMessage("Slug required"),
  body("excerpt").isString().trim().isLength({ min: 10 }).withMessage("Excerpt required"),
  body("content").isString().isLength({ min: 20 }).withMessage("Content required"),
  body("tags").optional().isArray().withMessage("Tags must be an array of strings"),
  body("images").optional().isArray().withMessage("Images must be an array of URLs"),
];

// Create
router.post("/", baseValidators, createBlog);

// Read
router.get("/", getBlogs);
router.get("/:idOrSlug", getBlogByIdOrSlug);

// Update
router.put("/:idOrSlug", [
  body("title").optional().isString().trim(),
  body("slug").optional().isString().trim(),
  body("excerpt").optional().isString().trim(),
  body("content").optional().isString(),
  body("tags").optional().isArray(),
  body("images").optional().isArray(),
], updateBlog);

// Delete
router.delete("/:idOrSlug", deleteBlog);

module.exports = router;


