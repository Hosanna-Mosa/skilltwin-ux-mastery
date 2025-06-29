const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const inquiryRoutes = require("./routes/inquiry");
const enrollRoutes = require("./routes/enroll");
const adminRoutes = require("./routes/admin");
const adminAuthRoutes = require("./routes/adminAuth");
const { errorHandler } = require("./middleware/errorHandler");
const configDB = require("./config/db");
require("dotenv").config();

const app = express();
const PORT = 8000;

// Middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/enroll", enrollRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminAuthRoutes);

// Error Handler
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Server ok");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

configDB();
