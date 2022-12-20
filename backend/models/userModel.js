//creating a schema for users

const mongoose = require("mongoose");

//create a userSchema that takes care of the field that we want the user to put and export them
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add name"],
    },

    email: {
      type: String,
      required: [true, "please add email"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "please add password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
