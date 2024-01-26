const { hashPassword, comparePassword } = require("../helpers/auth");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const fast2sms = require("fast-two-sms");

const SendOtpController = async (req, res) => {
  try {
    console.log(req.body);
    const { phone } = req.body;

    // validation
    if (!phone) {
      return res.status(400).send({
        success: false,
        message: "Phone number is required",
      });
    }

    let user = await User.findOne({
      phone,
    });

    if (!user) {
      user = await User.create({
        phone,
      });
    }

    // Genarating OTP
    const otp = Math.floor(Math.random() * 9000) + 1000;
    console.log(otp);
    const hashedOtp = await hashPassword(`${otp}`);
    user.otp = hashedOtp;
    user = await user.save();
    console.log(user);
    // Sending SMS
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
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const LoginController = async (req, res) => {
  try {
    console.log(req.body);
    const { otp, phone } = req.body;

    // validation
    if (!otp || !phone) {
      return res.status(400).send({
        success: false,
        message: "All the fileds are required",
      });
    }

    let user = await User.findOne({
      phone: phone,
    });
    // if not found
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Wrong credentials",
      });
    }

    // match
    const match = await comparePassword(otp, user.otp);
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
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  LoginController,
  SendOtpController,
};
