const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  speciality: {
    type: String,
    required: [true, "Speciality is required"],
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { collection: 'Doctor' }); // Specify the collection name here

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
