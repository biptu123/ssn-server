const jwt = require("jsonwebtoken");

// Protcted routes token based

const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
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

module.exports = { requireSignIn };
