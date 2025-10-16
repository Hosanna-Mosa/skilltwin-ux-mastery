const { validationResult } = require("express-validator");
const Blog = require("../models/Blog");

const handleValidation = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 400;
    error.details = errors.array();
    throw error;
  }
};

exports.createBlog = async (req, res, next) => {
  try {
    handleValidation(req);
    const { title, slug, excerpt, content, tags, images, author, publishedAt } = req.body;
    const exists = await Blog.findOne({ slug });
    if (exists) {
      return res.status(409).json({ message: "Slug already exists" });
    }
    const blog = await Blog.create({ title, slug, excerpt, content, tags, images, author, publishedAt });
    res.status(201).json(blog);
  } catch (err) {
    next(err);
  }
};

exports.getBlogs = async (req, res, next) => {
  try {
    const limit = Math.max(1, Math.min(50, parseInt(req.query.limit, 10) || 10));
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Blog.find()
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Blog.countDocuments(),
    ]);

    res.json({
      data: items,
      page,
      limit,
      total,
      hasMore: skip + items.length < total,
    });
  } catch (err) {
    next(err);
  }
};

exports.getBlogByIdOrSlug = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    const query = idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? { _id: idOrSlug } : { slug: idOrSlug };
    const blog = await Blog.findOne(query);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    handleValidation(req);
    const { idOrSlug } = req.params;
    const query = idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? { _id: idOrSlug } : { slug: idOrSlug };
    const updates = req.body;
    const blog = await Blog.findOneAndUpdate(query, updates, { new: true });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    const query = idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? { _id: idOrSlug } : { slug: idOrSlug };
    const result = await Blog.findOneAndDelete(query);
    if (!result) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};


