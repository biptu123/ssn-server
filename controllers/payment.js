const Order = require("../models/Order");
const razorpay = require("../utils/razorpay");
const crypto = require("crypto");
const axios = require("axios");
const request = require("request");

const checkoutController = async (req, res) => {
  try {
    const { amount, products, address } = req.body;

    const productOrder = await Order.create({
      user: req.user._id,
      address,
      products: products.map((product) => ({
        product: product._id,
        noOfItems: product.noOfItems,
      })),
    });

    console.log(productOrder);

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
      productOrder,
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
      orderCreationId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      productOrder,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Store into database
      const order = await Order.findById(productOrder._id);

      order.razorpay_payment_id = razorpay_payment_id;
      order.status = "placed";

      await order.save();

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

const getToken = async (req, res) => {
  try {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.INSTA_API_CLIENT_ID,
        client_secret: process.env.INSTA_API_CLIENT_SECRET,
      }),
    };

    const response = await fetch(
      "https://api.instamojo.com/oauth2/token/",
      options
    );

    // Parse JSON response
    const data = await response.json();

    console.log("data", data);
    // Access access_token from the parsed JSON response
    const accessToken = data.access_token;

    console.log(accessToken);

    res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create payment link" });
  }
};

const createPayment = async (req, res) => {
  try {
    const { products, amount, address, user, accessToken } = req.body;
    const headers = {
      "X-Api-Key": process.env.INSTAMOJO_API_KEY,
      "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
      Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
      accept: "application/json",
      "content-type": "application/x-www-form-urlencoded", // Set content type to JSON
    };

    const payload = {
      purpose: "test",
      amount,
      phone: address.phone,
      buyer_name: address.name,
      redirect_url: "http://www.example.com/redirect/",
      send_email: true,
      webhook: "http://www.example.com/webhook/",
      send_sms: true,
      email: address.email,
      allow_repeated_payments: false,
    };

    const url = "https://www.instamojo.com/test/1.1/payment-requests/";

    request.post(
      "https://www.instamojo.com/api/1.1/payment-requests/",
      { form: payload, headers: headers },
      function (error, response, body) {
        console.log(response);
        if (!error && response.statusCode == 201) {
          console.log(body);
        }
      }
    );

    // if (!response.ok) {
    //   throw new Error("Failed to create payment request");
    // }

    // const data = await response.json();
    // console.log(data);
    // res.status(200).json({
    //   success: true,
    //   data,
    // });
  } catch (error) {
    console.error("Error creating payment:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create payment link" });
  }
};

module.exports = {
  checkoutController,
  verificationController,
  getToken,
  createPayment,
};
