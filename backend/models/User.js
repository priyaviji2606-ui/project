const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  // ✅ Health Fields
  age: Number,
  gender: String,
  height: Number,
  weight: Number,
  diet: String,
  bmi: Number,
  bmiCategory: String,
  suggestion: String

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);