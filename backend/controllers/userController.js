const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc   Reg new user
//@route  POST
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("add all field");
  }

  const userExist = await User.findOne();

  if (userExist) {
    res.status(400);
    throw new Error("user exists");
  }
  const salting = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salting);

  //Creating the user
  const user = User.create({
    email,
    name,
    passord: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("invalid user");
  }
});

//@desc   authenticate new user
//@route  POST /API/USERS/LOGIN
//@access Public

const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "login" });
});

//@desc   get users
//@route  GET  /API/users/user
//@access Public

const getUser = asyncHandler(async (req, res) => {
  res.json({ message: "user data" });
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
