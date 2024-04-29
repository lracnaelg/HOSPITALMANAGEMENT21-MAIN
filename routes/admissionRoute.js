const express = require("express");
const router = express.Router();
const admissionController = require("../controller/admissionController");

router.get("/", admissionController.admissions);
router.get("/:id", admissionController.admissionById); // Updated route definition
router.post("/create", admissionController.createAdmission);
router.delete("/delete/:admissionID", admissionController.deleteAdmission);
router.put("/update/:id", admissionController.updateAdmission);

module.exports = router;
