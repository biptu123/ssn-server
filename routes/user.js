const express = require("express");

const { requireSignIn } = require("../middlewares/auth");
const {
  addAddessController,
  removeAddressController,
  makePrimaryController,
  getAddessesController,
} = require("../controllers/user");
const router = express.Router();

router.post("/add-address", requireSignIn, addAddessController);
router.get("/get-addresses", requireSignIn, getAddessesController);
router.post("/remove-address", requireSignIn, removeAddressController);
router.post("/make-primary", requireSignIn, makePrimaryController);

module.exports = router;
