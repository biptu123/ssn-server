const express = require("express");
const {
  createProductController,
  getProductsController,
  deleteProductController,
} = require("../controllers/product");
const { requireSignIn, isAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/", requireSignIn, isAdmin, createProductController);
router.get("/", getProductsController);
router.delete("/:id", requireSignIn, isAdmin, deleteProductController);

module.exports = router;
