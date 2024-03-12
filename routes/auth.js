const express = require("express");
const { LoginController, SendOtpController } = require("../controllers/auth");

const { requireSignIn, isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.post("/sendotp", SendOtpController);
router.post("/login", LoginController);
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
