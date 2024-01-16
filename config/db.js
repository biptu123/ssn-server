const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to ${conn.connection.host}`.bgCyan.white);
  } catch (error) {
    console.log(`Error in MongoDB ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
