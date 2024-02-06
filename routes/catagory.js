const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/auth");
const {
  createCategoryController,
  getCategoryController,
  getCategoriesController,
  deleteCategoryController,
  updateCategoryController,
} = require("../controllers/category");

// router object
const router = express.Router();

// create category
router.post("/", createCategoryController);

// delete category
router.delete("/:id", requireSignIn, isAdmin, deleteCategoryController);

// update category
router.put("/:id", requireSignIn, isAdmin, updateCategoryController);

// get single category
router.get("/:id", getCategoryController);

// get all category
router.get("/", getCategoriesController);

module.exports = router;
