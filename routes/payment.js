const express = require("express");
const {
  checkoutController,
  verificationController,
} = require("../controllers/payment");
const router = express.Router();

router.post("/checkout", checkoutController);
router.post("/verification", verificationController);

module.exports = router;
