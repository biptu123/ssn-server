const User = require("../models/User");
const Order = require("../models/Order");
const slugify = require("slugify");

const addAddessController = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findById(req.user._id);
    if (address._id) {
      user.addresses = user.addresses.map((item) => {
        if (item._id == address._id) {
          return address;
        }
        return item;
      });
    } else {
      user.addresses = [...user.addresses, address];
    }

    user.address = address;

    const updatedUser = await user.save();

    return res.status(201).send({
      success: true,
      message: "New address added",
      user,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to add address",
      error,
    });
  }
};

// Update Category
const makePrimaryController = async (req, res) => {
  try {
    const { adress } = req.body;
    const user = await User.findbyId(req.user._id);
    user.address = adress;
    const updatedUser = await user.save();
    return res.status(201).send({
      success: true,
      message: "Updated Successfully ",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to update address",
      error,
    });
  }
};

// Delete Catagory
const removeAddressController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // Filter out the address to be removed

    const upDatedAddress = [];
    user.addresses.forEach((address) => {
      if (!address._id.equals(req.body.address._id)) {
        upDatedAddress.push(address);
      }
    });

    user.addresses = upDatedAddress;

    const updatedUser = await user.save();

    return res.status(201).send({
      success: true,
      message: "Deleted Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to delete address",
      error,
    });
  }
};

const getAddessesController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const addresses = user.addresses;

    return res.status(201).send({
      success: true,
      message: "Successful",
      addresses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to get addresses",
      error,
    });
  }
};

const getUsersController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    console.log(user);
    return res.status(201).send({
      success: true,
      message: "Successful",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to get user",
      error,
    });
  }
};
const getOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    return res.status(201).send({
      success: true,
      message: "Successful",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to get orders",
      error,
    });
  }
};
module.exports = {
  addAddessController,
  makePrimaryController,
  removeAddressController,
  getAddessesController,
  getUsersController,
  getOrdersController,
};
