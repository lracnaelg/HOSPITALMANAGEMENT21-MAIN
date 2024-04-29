const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const admissionDocument = new Schema({
  admissionDate: {
    type: Date,
    default: new Date(),
  },

  dischargeDate: {
    type: Date,
    default: null, // Default to null until discharged
  },

  diagnosis: {
    type: String,
    default: "", // Default to an empty string for diagnosis
  },
}, { collection: 'Admission' }); // Specify the collection name here

const Admission = mongoose.model("Admission", admissionDocument);
module.exports = Admission;
