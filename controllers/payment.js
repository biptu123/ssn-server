const Order = require("../models/Order");
const razorpay = require("../utils/razorpay");
const crypto = require("crypto");

const checkoutController = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || isNaN(Number(amount))) {
      return res.status(500).send({
        success: false,
        message: "Invalid amount provided",
      });
    }
    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
    };

    const order = await razorpay.orders.create(options);
    console.log(order);
    res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_API_KEY,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to checkout",
      error,
    });
  }
};

const verificationController = async (req, res) => {
  try {
    const {
      user,
      products,
      orderCreationId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Store into database
      const order = await Order.create({
        user,
        razorpay_payment_id,
        products: products.map((product) => ({
          product: product._id,
          noOfItems: product.noOfItems,
        })),
      });

      // Payment successful
      return res.status(200).json({
        success: true,
        message: "Payment Successful",
        order,
      });
    }

    // Payment unsuccessful
    return res.status(500).json({
      success: false,
      message: "Payment Unsuccessful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to checkout",
      error,
    });
  }
};

module.exports = { checkoutController, verificationController };
