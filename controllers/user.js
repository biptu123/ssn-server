const User = require("../models/User");
const slugify = require("slugify");

const addAddessController = async (req, res) => {
  console.log("here");
  try {
    const { address } = req.body;

    console.log(address);
    console.log(address.pincode);
    if (!address) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findById(req.user._id);
    user.addresses = [...user.addresses, address];

    user.address = address;

    const updatedUser = await user.save();
    console.log(updatedUser);

    return res.status(201).send({
      success: true,
      message: "New address added",
      updatedUser,
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
    user.addresses = user.addresses.filter(
      (address) => !_.isEqual(address, req.body.address)
    );

    if (_.isEqual(user.address, req.body.address)) user.address = null;

    const updatedUser = await user.save();

    return res.status(201).send({
      success: true,
      message: "Deleted Successfully ",
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

module.exports = {
  addAddessController,
  makePrimaryController,
  removeAddressController,
};
