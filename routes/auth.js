const express = require("express");
const {
  LoginController,
  RegisterController,
  VerifyOtpController,
} = require("../controllers/auth");

const { requireSignIn } = require("../middlewares/auth");

// router object
const router = express.Router();

// routing
//REGISTER
router.post("/register", RegisterController);
// VERIFY OTP
router.post("/verifyotp", VerifyOtpController);
// LOGIN
router.post("/login", LoginController);

// Protected route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
