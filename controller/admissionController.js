const Admission = require("../models/admissionSchema");

module.exports.admissions = (req, res) => {
  Admission.find()
    .then((admissions) => res.send(admissions))
    .catch((error) => res.send(error));
};

module.exports.admissionById = (req, res) => { // Renamed to admissionById
  const admissionID = req.params.id;

  Admission.findById(admissionID)
    .then((admission) => res.send(admission))
    .catch((error) => res.send(error));
};

module.exports.createAdmission = async (req, res) => {
  const { admissionDate, dischargeDate, diagnosis } = req.body;

  const newAdmission = new Admission({
    admissionDate,
    dischargeDate,
    diagnosis,
  });

  try {
    const savedAdmission = await newAdmission.save();
    res.status(201).json(savedAdmission); // Return the saved admission object
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports.deleteAdmission = async (req, res) => {
  const admissionID = req.params.admissionID;

  try {
    const deletedAdmission = await Admission.findByIdAndDelete(admissionID);
    if (!deletedAdmission) {
      return res.status(404).json({ error: "Admission not found" });
    }
    res.status(200).json(deletedAdmission);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};


module.exports.updateAdmission = (req, res) => {
  const { admissionDate, dischargeDate, diagnosis } = req.body;

  const admissionID = req.params.id;

  const updatedFields = { admissionDate, dischargeDate, diagnosis };

  Admission.findByIdAndUpdate(admissionID, updatedFields, { new: true })
    .then((updatedAdmission) => {
      if (!updatedAdmission) {
        return res.status(404).json({ error: "Admission not found" });
      }

      res.status(200).json(updatedAdmission);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message || "Internal server error" });
    });
};
