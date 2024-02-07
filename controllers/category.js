const Category = require("../models/Category");
const slugify = require("slugify");

const cloudinary = require("../utils/cloudinary");

// Create Category
const createCategoryController = async (req, res) => {
  try {
    // upload the image
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
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

    const imageResult = await cloudinary.uploader.upload(image, {
      folder: "ssn",
      quality: 60,
      width: 500,
      height: 500,
    });

    if (imageResult) {
      const category = await Category.create({
        name,
        slug: slugify(name),
        image: {
          public_id: imageResult.public_id,
          url: imageResult.secure_url,
        },
      });

      return res.status(201).send({
        success: true,
        message: "New category created",
        category,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Failed to upload",
      });
    }
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
    const { name, image } = req.body;
    if (!name || !image) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    const category = await Category.findById(_id);
    if (!category) {
      return res.status(201).send({
        success: false,
        message: "Category not found",
      });
    }
    const uploadResult = await cloudinary.uploader.upload(image, {
      folder: "ssn",
      quality: 60,
      width: 500,
      height: 500,
    });

    const deleteResult = await cloudinary.api.delete_resources(
      category.image.public_id,
      {
        type: "upload",
        resource_type: "image",
      }
    );

    if (uploadResult && deleteResult) {
      category.name = name;
      category.slug = slugify(name);
      category.image = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };
      await category.save();
      return res.status(201).send({
        success: true,
        message: "Updated Successfully ",
        category,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Failed to upload",
      });
    }
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
    const category = await Category.findOneAndDelete({ _id });
    const deleteResult = await cloudinary.api.delete_resources(
      category.image.public_id,
      {
        type: "upload",
        resource_type: "image",
      }
    );
    if (deleteResult) {
      return res.status(201).send({
        success: true,
        message: "Deleted Successfully ",
        category,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Failed to delete",
      });
    }
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
