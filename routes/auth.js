const express = require("express");
const { LoginController, SendOtpController } = require("../controllers/auth");

const { requireSignIn, isAdmin } = require("../middlewares/auth");

// router object
const router = express.Router();

// routing
//REGISTER
// router.post("/register", RegisterController);
// SEND OTP
router.post("/sendotp", SendOtpController);
// VERIFY OTP
// router.post("/verifyotp", VerifyOtpController);
// LOGIN
router.post("/login", LoginController);

// Protected route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Protected admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
