const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authorize = (role, userModel) =>
  asyncHandler(async (req, res, next) => {
    let token;

    // Extract the JWT token from the cookie
    token = req.body.token;

    if (token) {
      try {
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        // Fetch user information based on the decoded user ID using the provided user model
        const user = await userModel.findById(decoded.id._id);
        if (!user) {
          res.status(401);
          throw new Error("Not authorized, user not found");
        }

        // Attach the user object to the request

        // Check user's role for role-based access control
        if (user.role === role) {
          // Allow access for admin
          next();
        } else {
          res
            .status(403)
            .json({ error: "Not authorized, insufficient privileges" });
        }
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  });

module.exports = {
  CitizenOnly: authorize("user", require("../../models/user")),
  FieldStaffOnly: authorize("fieldStaff", require("../../models/fieldStaff")),
  // DepartmentHeadOnly: authorize("deptHead", require("../models/deptHead")),
  // CommissionerOnly: authorize(
  //   "Commissioner",
  //   require("../models/commissioner")
  // ),
};
