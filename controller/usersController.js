const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// -------Registration-------
const register = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  // Validate
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("Please add all field");
  }

  // Check email is taken or not
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email is already register");
  }

  // Hash the User password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //  create User
  const newUser = await User({
    userName,
    password: hashPassword,
    email,
  });

  // Add the date the trial will end
  newUser.trialExpires = new Date(
    new Date().getTime() + newUser.trialPeriod * 24 * 60 * 60 * 1000
  );

  // Save the User
  await newUser.save();

  res.json({
    status: true,
    message: "Registration was Successfull",
    user: {
      userName,
      email,
    },
  });
});
// -------Login-------

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Check for User Email
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  // check password is valid
  const isMatch = await bcrypt.compare(password, user?.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // Generate Token using (jwt)
  const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
    expiresIn: "3d", // Token Expiration
  });
  console.log(token);
  // Set the token into cookie (http only)
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  // send response
  res.json({
    status: "success",
    _id: user?._id,
    message: "Login success",
    username: user?.userName,
    email: user?.email,
  });
});
// -------Logout-------
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.status(200).json({ message: " Logged out successfully" });
});
// -------Profile-------
const userProfile = asyncHandler(async (req, res) => {
  console.log(req.user);
  const id = req.user._id;
  const user = await User.findById(id).select("-password");
  if (user) {
    res.status(200).json({
      status: "success",
      user,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
// -------Checkuser Auth status-------
// -------Registration-------

module.exports = {
  register,
  login,
  logout,
  userProfile,
};
