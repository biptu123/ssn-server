const Product = require("../models/Product");
const cloudinary = require("../utils/cloudinary");
const slugify = require("slugify");

const createProductController = async (req, res) => {
  console.log(req.body.images);
  try {
    const { name, description, prices, category, images } = req.body;

    if (
      !name ||
      !description ||
      !category ||
      !(prices && prices.length > 0) ||
      !images
    ) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    // Process images
    const processedImages = [];
    for (let image of images) {
      const imageResult = await cloudinary.uploader.upload(image, {
        folder: "ssn",
        quality: 60,
        width: 500,
        height: 500,
      });
      processedImages.push({
        public_id: imageResult.public_id,
        url: imageResult.secure_url,
      });
    }

    console.log(processedImages);
    // Create the product
    const product = await Product.create({
      name,
      category,
      slug: slugify(name),
      description,
      prices,
      images: [...processedImages],
    });

    console.log(product);

    return res.status(201).send({
      success: true,
      message: "New product created",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to create product",
      error,
    });
  }
};

// Update Category
const updateProductController = async (req, res) => {
  try {
    console.log(req.params);
    const _id = req.params.id;
    const { name } = req.body;
    const catagoty = await Product.findOneAndUpdate(
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
      message: "Failed to update product",
      error,
    });
  }
};

// Delete Catagory
const deleteProductController = async (req, res) => {
  console.log(req.params._id);
  try {
    const _id = req.params.id;
    const product = await Product.findOneAndDelete({ _id });
    // const product = await Product.findOne({ _id });
    const publicIds = product.images.map((image) => image.public_id);
    console.log(publicIds);
    const result = await cloudinary.api.delete_resources(publicIds, {
      type: "upload",
      resource_type: "image",
    });

    console.log(result);
    // product.images.forEach((image) => {
    //     cloudinary.uploader.destroy(image.public_id, function (err, result) {
    //     console.log(result);
    //   });
    // });

    return res.status(201).send({
      success: true,
      message: "Deleted Successfully ",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to delete product",
      error,
    });
  }
};

// Get Categories
const getProductsController = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(201).send({
      success: true,
      message: "All products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to fetch products",
      error,
    });
  }
};

// Get Single Category
const getProductController = async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await Product.findOne({ _id });
    return res.status(201).send({
      success: true,
      message: "Category: ",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to fetch product",
      error,
    });
  }
};

module.exports = {
  createProductController,
  getProductController,
  getProductsController,
  deleteProductController,
  updateProductController,
};
