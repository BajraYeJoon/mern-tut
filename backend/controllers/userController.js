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
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generatToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc   authenticate new user
//@route  POST /API/USERS/LOGIN
//@access Public

const loginUser = asyncHandler(async (req, res) => {
  //Checking for the authentication
  //Firstly get the data from the body in the form to use it
  const { email, password } = req.body;

  //find the email
  const user = await User.findOne({ email });

  //Check for the passowrd if it matches then return the id, email and password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generatToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid password or usernamee");
  }

  res.json({ message: "login" });
});

//@desc   get users
//@route  GET  /API/users/user
//@access Private
const getUser = asyncHandler(async (req, res) => {
  //getting the info of users and user.id comes from authMidd....
  res.status(200).json(req.user);
});

//Generating a JWT for token
const generatToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
