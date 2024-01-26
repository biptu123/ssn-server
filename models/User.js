const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: {
        firstName: {
          type: String,
          default: "Guest",
        },
        lastName: {
          type: String,
          default: "",
        },
      },
    },
    email: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: null,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      default: null,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
