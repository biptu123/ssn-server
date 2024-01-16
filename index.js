const express = require("express");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const app = express();
const path = require("path");

// configure dotenv
dotenv.config();
const PORT = process.env.PORT || 8080;

// database configuration
connectDB();

// middlewares
app.use(
  cors({
    origin: ["http://localhost:3000", process.env.CLIENT_URL],
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/build")));

// routes
app.use("/api/v1/auth", require("./routes/auth"));

// rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgGreen.white);
});
