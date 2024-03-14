const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    razorpay_payment_id: {
      type: String,
    },
    user: {
      type: mongoose.ObjectId,
      ref: "user",
      required: true,
    },
    address: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      pincode: {
        type: Number,
      },
      state: {
        type: String,
      },
      street: {
        type: String,
      },
      district: {
        type: String,
      },
      locality: {
        type: String,
      },
    },
    products: [
      {
        product: {
          type: mongoose.ObjectId,
          ref: "product",
        },
        noOfItems: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "placed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamp: true }
);

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
