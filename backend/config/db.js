const mongoose = require("mongoose");
const dbURL = 'mongodb://127.0.0.1:27017/skillTwin';

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  //  process.exit(1);
  }
};

module.exports = connectDB;
