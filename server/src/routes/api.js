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
router.post("/user/logout", authController.logoutUser);

router.post(
  "/services/complaint",
  upload.array("images", 2),
  complaintController.complaint
);
router.post(
  "/services/complaint/addimage",
  upload.single("image"),
  complaintController.addimage
);
router.post(
  "/updateComplaintStatus",
  complaintController.updateComplaintStatus
);

//admin routes
router.post("/admin/login", adminController.dashboard);
router.get("/admin/fetchData", adminController.fetchData);

//wardData Routes
router.post("/addWardData", wardDataController.addWardData);
router.post("/fetchWardData", wardDataController.fetchWardData);
//router.get("/getallwards", wardDataController.getAllWards);

router.post("/addFieldStaff", fieldStaffController.addFieldStaff);
router.post("/removeFieldStaff", fieldStaffController.removeFieldStaff);
router.post("/fetchFieldStaff", fieldStaffController.fetchFieldStaff);

router.post("/fetchComplaintsUser", complaintController.fetchComplaintsUser);
router.post("/fetchComplaintsAdmin", complaintController.fetchComplaintsAdmin);
module.exports = router;
