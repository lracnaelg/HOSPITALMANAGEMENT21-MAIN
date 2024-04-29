const Patient = require("../models/patientSchema");

module.exports.patients = async (req, res) => {
  try {
    const patients = await Patient.find({ active: true });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports.patient = async (req, res) => {
  const patientID = req.params.id;
  try {
    const patient = await Patient.findById(patientID);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports.createPatient = async (req, res) => {
  const { firstName, lastName, age, active, confined } = req.body;
  const newPatient = new Patient({
    firstName,
    lastName,
    age,
    active,
    confined,
  });

  try {
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports.deletePatient = async (req, res) => {
  const patientID = req.params.patientID;
  console.log("Deleting patient with ID:", patientID); // Log patientID for debugging
  try {
    const deletedPatient = await Patient.findByIdAndDelete(patientID);
    if (!deletedPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(deletedPatient);
  } catch (error) {
    console.log("Error deleting patient:", error.message); // Log any errors for debugging
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};




module.exports.updatePatient = async (req, res) => {
  const { firstName, lastName, age, active, confined } = req.body;
  const patientID = req.params.id;
  const updatedFields = { firstName, lastName, age, active, confined };

  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      patientID,
      updatedFields,
      { new: true }
    );
    if (!updatedPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(updatedPatient);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
