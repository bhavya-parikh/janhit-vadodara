const Admin = require("../models/admin");
const asyncHandler = require("express-async-handler");

const dashboard = asyncHandler(async (req, res) => {
  const admin = {
    username,
    password,
    role,
  };

  const Admin = await Admin.findOne({ username: req.body.username });
  const role = req.body.role;

  if (role !== "fieldStaff" || role !== "deptHead" || role !== "commissioner") {
    res.status(404).send({ message: "Role is invalid!" });
  }
  if (!Admin) {
    res.status(404).send({ message: "User Not Found" });
  }
  const validate = await bcrypt.compare(req.body.password, user.password);
  if (!validate) {
    res.status(403).send({ message: "Wrong Pass" });
  }
  res.status(200).send({ message: "Logged In!", user });
});

const fetchData = asyncHandler(async (req, res) => {
  const role = req.body.username;
  try {
    const complaints = await Complaint.find({ role }); // Use the "role" parameter to filter complaints
    res.json(complaints);
  } catch (errors) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching complaints." });
  }
});

module.exports = {
  dashboard,
  fetchData,
};
