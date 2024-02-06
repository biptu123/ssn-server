const Category = require("../models/Category");
const slugify = require("slugify");

// Create Category
const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Name is required",
      });
    }

    const existingCategory = await Category.findOne({
      name,
    });
    if (existingCategory) {
      return res.status(201).send({
        success: false,
        message: "Same category already exist",
      });
    }

    const category = await Category.create({
      name,
      slug: slugify(name),
    });

    return res.status(201).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to create category",
      error,
    });
  }
};

// Update Category
const updateCategoryController = async (req, res) => {
  try {
    console.log(req.params);
    const _id = req.params.id;
    const { name } = req.body;
    const catagoty = await Category.findOneAndUpdate(
      { _id },
      {
        name,
        slug: slugify(name),
      }
    );
    return res.status(201).send({
      success: true,
      message: "Updated Successfully ",
      catagoty,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to update category",
      error,
    });
  }
};

// Delete Catagory
const deleteCategoryController = async (req, res) => {
  try {
    const _id = req.params.id;
    const catagoty = await Category.findOneAndDelete({ _id });
    return res.status(201).send({
      success: true,
      message: "Deleted Successfully ",
      catagoty,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to delete category",
      error,
    });
  }
};

// Get Categories
const getCategoriesController = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(201).send({
      success: true,
      message: "All categories",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to fetch category",
      error,
    });
  }
};

// Get Single Category
const getCategoryController = async (req, res) => {
  try {
    const _id = req.params.id;
    const category = await Category.findOne({ _id });
    return res.status(201).send({
      success: true,
      message: "Category: ",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to fetch category",
      error,
    });
  }
};

module.exports = {
  createCategoryController,
  getCategoryController,
  getCategoriesController,
  deleteCategoryController,
  updateCategoryController,
};
