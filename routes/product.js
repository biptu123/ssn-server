const express = require("express");
const {
  createProductController,
  getProductsController,
  deleteProductController,
  getProductController,
} = require("../controllers/product");
const { requireSignIn, isAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/", requireSignIn, isAdmin, createProductController);
router.get("/", getProductsController);
router.get("/:id", getProductController);
router.delete("/:id", requireSignIn, isAdmin, deleteProductController);

module.exports = router;
