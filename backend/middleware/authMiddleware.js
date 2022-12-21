//middleware runs everytime in the request response cycle and specifically this middleware checks for any token that is been generated in during login and protect our routes

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//protecting function
const protect = asyncHandler(async (req, res, next) => {
  //then we have to check for the http header for authorization as header auth allows to provides credentials that authenticates user with srver

  let token;

  //check for the http authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get the token from the header
      token = req.headers.authorization.split(" ")[1];

      //verify the token
      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

      //get the token from the user
      //make a requst with user
      req.user = await User.findById(verifiedToken.id).select("-password");

      next();
    } catch (err) {
      res.status(401);
      throw new Error("NOT AUTHORIZED");
    }
  }

  if (!token) {
    res.status(400);
    throw new Error("not token");
  }
});

module.exports = { protect };
