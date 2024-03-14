const express = require("express");
const {
  checkoutController,
  verificationController,
  getToken,
  createPayment,
} = require("../controllers/payment");
const router = express.Router();

router.post("/checkout", checkoutController);
router.post("/verification", verificationController);
router.post("/get-token", getToken);
router.post("/create-payment", createPayment);
module.exports = router;
