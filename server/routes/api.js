const express = require("express");
const router = express.Router();
const authController = require("../controllers/apiControllers");
const complaintController = require("../controllers/complaintController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.post(
  "/services/complaint",
  upload.single("image"),
  complaintController.complaint
);
module.exports = router;
