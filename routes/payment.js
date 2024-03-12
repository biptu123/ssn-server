const express = require("express");
const { requireSignIn } = require("../middlewares/auth");
const { checkoutController } = require("../controllers/payment");
const router = express.Router();

router.post("/checkout", checkoutController);

module.exports = router;
