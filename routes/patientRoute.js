const express = require("express");
const router = express.Router();
const patientController = require("../controller/patientController");

// Route to get all patients
router.get("/", patientController.patients);

// Route to get a specific patient by ID
router.get("/:id", patientController.patient);

// Route to create a new patient
router.post("/", patientController.createPatient);

// Route to delete a patient by ID
router.delete("/:patientID", patientController.deletePatient);

// Route to update a patient by ID
router.put("/:id", patientController.updatePatient);

module.exports = router;
