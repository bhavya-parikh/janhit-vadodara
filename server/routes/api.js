const express = require("express");
const router = express.Router();
const authController = require("../controllers/apiControllers");
const complaintController = require("../controllers/complaintController");
const adminController = require("../controllers/adminController");
const wardDataController = require("../controllers/wardDataController");
const fieldStaffController = require("../controllers/fieldStaffController");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.post(
  "/services/complaint",
  upload.single("image"),
  complaintController.complaint
);

//admin routes
router.post("/admin/login", adminController.dashboard);
router.get("/admin/fetchData", adminController.fetchData);

//wardData Routes
router.post("/addWardData", wardDataController.addWardData);
router.post("/fetchWardData", wardDataController.fetchWardData);

router.post("/addFieldStaff", fieldStaffController.addFieldStaff);
router.post("/fetchFieldStaff", fieldStaffController.fetchFieldStaff);

router.post("/fetchComplaints", complaintController.fetchComplaints);
module.exports = router;
