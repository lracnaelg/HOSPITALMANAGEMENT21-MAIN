const Doctor = require("../models/doctorSchema");

module.exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ active: true });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports.getDoctorById = async (req, res) => {
  const doctorID = req.params.id;
  try {
    const doctor = await Doctor.findById(doctorID);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports.createDoctor = async (req, res) => {
  const { firstName, lastName, speciality, active } = req.body;
  const newDoctor = new Doctor({
    firstName,
    lastName,
    speciality,
    active,
  });

  try {
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports.deleteDoctor = async (req, res) => {
  const doctorID = req.params.id;
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(doctorID);
    if (!deletedDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.json(deletedDoctor);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};


module.exports.updateDoctor = async (req, res) => {
  const { firstName, lastName, speciality, active } = req.body;
  const doctorID = req.params.id;
  const updatedFields = { firstName, lastName, speciality, active };

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorID,
      updatedFields,
      { new: true }
    );
    if (!updatedDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
