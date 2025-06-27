const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const inquiryRoutes = require("./routes/inquiry");
const enrollRoutes = require("./routes/enroll");
const adminRoutes = require("./routes/admin");
const { errorHandler } = require("./middleware/errorHandler");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/enroll", enrollRoutes);
app.use("/api/admin", adminRoutes);

// Error Handler
app.use(errorHandler);

module.exports = app;
