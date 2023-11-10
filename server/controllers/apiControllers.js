const bcrypt = require("bcryptjs");
const { createSecretToken } = require("../util/SecretToken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const registerUser = asyncHandler(async (req, res, next) => {
  const { addharid, username, password } = req.body;
  if (!addharid || !username || !password) {
    console.log(addharid, username, password);
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
      });
      if (user) {
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
          withCredentials: true,
          httpOnly: false,
        });
        res.status(201).json({
          message: "User signed in successfully",
          success: true,
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
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).send({ message: "User Not Found" });
    }
    const validate = await bcrypt.compare(password, user.password);
    if (!validate) {
      res.status(403).send({ message: "Wrong Pass" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
  }
});

module.exports = {
  registerUser,
  loginUser,
};
