const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const registerUser = asyncHandler(async (req, res) => {
  const { addharid, username, password } = req.body;
  if (!addharid || !username || !password) {
    console.log(addharid, username, password);
    res.status(400);
    throw new Error("Please add all fields");
  }

  //Check if user already exists
  const userExist = await User.findOne({ username });
  if (userExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  //Hasing Pass
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Creating user
  const user = await User.create({
    addharid,
    username,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      addharid: user.addharid,
      username: user.username,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  const validate = await bcrypt.compare(req.body.password, user.password);
  if (!validate) {
    return res.status(403).json({ message: "wrong password" });
  }
  res.status(200).json(user);
});

module.exports = {
  registerUser,
  loginUser,
};
