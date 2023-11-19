const bcrypt = require("bcryptjs");
const { createSecretToken } = require("../util/SecretToken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const registerUser = asyncHandler(async (req, res, next) => {
  const { addharid, username, password, createdAt } = req.body;
  const role = "user";
  if (!addharid || !username || !password) {
    res.status(400).send({ message: "Please add all fields" });
  } else {
    const userExist = await User.findOne({ username });
    if (userExist) {
      res.status(400).send({ message: "User Already Exist!" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Creating user
      const user = await User.create({
        addharid,
        username,
        password: hashedPassword,
        createdAt,
        role,
      });
      if (user) {
        const token = createSecretToken(user);
        // res.cookie("token", token, {
        //   withCredentials: true,
        //   httpOnly: false,
        //   sameSite: "none",
        //   domain: process.env.ORIGIN,
        //   secure: true,
        // });

        res.status(201).json({
          message: "User signed in successfully",
          success: true,
          cookie: token,
          user,
        });
        next();
      } else {
        res.status(400).send({ error: "Invalid user data" });
      }
    }
  } // Check if user already exists

  // Hasing Pass
});

const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).send({ message: "User Not Found" });
    }
    const userRole = user.role;
    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!validate) {
      return res.status(403).json({ message: "Incorrect Password or Email!" });
    }
    const token = createSecretToken(user);
    // res.cookie("token", token, {
    //   withCredentials: true,
    //   httpOnly: false,
    //   sameSite: "none",
    //   domain: process.env.ORIGIN,
    //   secure: true,
    // });
    res.status(201).json({
      message: "User logged in successfully",
      token,
      user,
      cookie: token,
    });
    next();
  } catch (error) {}
});

const logoutUser = asyncHandler(async (req, res, next) => {
  // res.cookie("token", "", {
  //   httpOnly: true,
  //   expires: new Date(0),
  //   sameSite: "none",
  //   domain: process.env.ORIGIN,
  //   secure: true,
  // });
  res.status(200).json({ message: "Logged out successfully" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
};
