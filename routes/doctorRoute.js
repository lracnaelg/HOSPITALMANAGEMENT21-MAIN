const express = require("express");
const router = express.Router();
const doctorController = require("../controller/doctorController"); // Updated path

// Route to get all doctors
router.get("/", doctorController.getDoctors); 

// Route to get a specific doctor by ID
router.get("/:id", doctorController.getDoctorById);

// Route to create a new doctor
router.post("/create", doctorController.createDoctor);

// Route to delete a doctor by ID
router.delete("/delete/:id", doctorController.deleteDoctor);

// Route to update a doctor by ID
router.put("/update/:id", doctorController.updateDoctor);

module.exports = router;
