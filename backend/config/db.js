const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI ||        
'mongodb+srv://sunandvemavarapu_db_user:6RfYz41QXJl1fRm2@empty4.wwtfxjx.mongodb.net/'
    );
    console.log(`Database connected: ${conn.connection.host}`);
    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.log("Database connection error:", err);
    });
    // Graceful shutdown
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("Database connection closed");
      process.exit(0);
    });
  } catch (error) {
    console.log("Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
