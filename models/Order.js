const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    razorpay_payment_id: {
      type: String,
      required: true,
      unique: false,
    },
    user: {
      type: mongoose.ObjectId,
      ref: "user",
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
      enum: ["placed", "shipped", "delivered", "cancelled"],
      default: "placed",
    },
  },
  { timestamp: true }
);

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
