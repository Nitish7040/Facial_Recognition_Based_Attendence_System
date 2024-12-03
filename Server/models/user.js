const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  Branch: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  admissionNo: {
    type: String,
    required: true,
  },
  erpId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Student", studentSchema);
