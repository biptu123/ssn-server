const { hashPassword, comparePassword } = require("../helpers/auth");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const fast2sms = require("fast-two-sms");

const RegisterController = async (req, res) => {
  console.log(req.body);
  try {
    const { name, password, phone } = req.body;

    // validation
    if (!name?.firstName || !name?.lastName || !password || !phone) {
      return res.status(400).send({
        success: false,
        message: "All the fileds are required",
      });
    }

    const user = await User.findOne({
      phone,
      verified: true,
    });

    if (user) {
      return res.status(400).send({
        success: false,
        message: "Phone number already exists",
      });
    }

    const notVerifiedUser = await User.findOne({
      phone,
      verified: false,
    });
    if (notVerifiedUser) {
      await User.findByIdAndDelete(notVerifiedUser._id);
    }

    // register user
    const hashedPassword = await hashPassword(password);

    const otp = Math.floor(Math.random() * 9000) + 1000;
    const newUser = await User.create({
      name,
      phone,
      password: hashedPassword,
      otp,
    });

    try {
      var options = {
        authorization: process.env.SMS_API_KEY,
        message: `Hello User your one time password is: ${otp}`,
        numbers: [phone],
      };
      const smsresponse = await fast2sms.sendMessage(options);
      console.log("SMS res", smsresponse);
      res.status(201).send({
        success: true,
        message: "Otp sent to your mobile",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Failed to send SMS to the client",
        error,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Some Internal Error",
      error,
    });
  }
};

const VerifyOtpController = async (req, res) => {
  try {
    let user = await User.findOne({
      phone: req.body.phone,
      otp: req.body.otp,
    });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Verification Failed",
      });
    }
    try {
      await User.findOneAndUpdate(
        { _id: user._id },
        {
          verified: true,
        }
      );
      res.status(201).send({
        success: true,
        message: "Registerd Successfully",
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const LoginController = async (req, res) => {
  console.log(req.body);
  try {
    const { phone, password } = req.body;
    // validation
    if (!password || !phone) {
      return res.status(400).send({
        success: false,
        message: "All the fileds are required",
      });
    }

    // get user
    const user = await User.findOne({ phone, verified: true });
    // if not found
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Wrong credentials",
      });
    }

    // match
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Wrong credentials",
      });
    }

    // create token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).send({
      success: true,
      message: "Login Successful",
      token,
      user: {
        name: user.name,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

module.exports = { RegisterController, LoginController, VerifyOtpController };
