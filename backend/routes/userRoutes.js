const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Update health data
router.post("/update-health", async (req, res) => {
  try {
    console.log("Incoming body:", req.body);

    const { userId, age, gender, height, weight, diet, bmi, bmiCategory, suggestion } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID missing" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        age,
        gender,
        height,
        weight,
        diet,
        bmi,
        bmiCategory,
        suggestion
      },
      { returnDocument: "after" }
    );

    console.log("Updated User:", updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Health data updated",
      user: updatedUser
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;