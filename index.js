const express = require("express");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const app = express();

// configure dotenv
dotenv.config();
const PORT = process.env.PORT || 8080;

// database configuration
connectDB();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api/v1/auth", require("./routes/auth"));

// rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to SSN</h1>");
});

// listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgGreen.white);
});
