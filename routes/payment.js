const express = require("express");
const { requireSignIn } = require("../middlewares/auth");

const {
  checkoutController,
  verificationController,
  getToken,
  createPayment,
} = require("../controllers/payment");
const router = express.Router();

router.post("/checkout", requireSignIn, checkoutController);
router.post("/verification", verificationController);
router.post("/get-token", getToken);
router.post("/create-payment", createPayment);
module.exports = router;
