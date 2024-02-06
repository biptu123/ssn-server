const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    prices: [
      {
        quantity: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        originalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    category: {
      type: mongoose.ObjectId,
      ref: "categories",
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    shipping: {
      type: Boolean,
      default: false,
    },
  },
  { timestamp: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
