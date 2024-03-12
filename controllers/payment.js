const razorpay = require("../utils/razorpay");

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
      amount: Number(amount * 100),
      currency: "INR",
    };

    const order = await razorpay.orders.create(options);
    console.log(order);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to checkout",
      error,
    });
  }
};

const verificationController = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!(amount && isNaN(Number(amount)))) {
      return res.status(500).send({
        success: false,
        message: "Invalid amount provided",
      });
    }
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
    };

    const order = await razorpay.orders.create(options);
    console.log(order);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to checkout",
      error,
    });
  }
};

module.exports = { checkoutController };
