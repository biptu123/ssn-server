const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protcted routes token based

const requireSignIn = async (req, res, next) => {
  console.log(req.headers.authorization);
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    console.log(decode);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Unauthorized Access",
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.role)
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Unauthorized Access",
    });
  }
};

module.exports = { requireSignIn, isAdmin };
