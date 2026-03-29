const express = require("express");
const router = express.Router();
const User = require("../models/User");

const mongoose = require("mongoose");

// Update health data
router.post("/update-health", async (req, res) => {
  try {
    console.log("Incoming body:", req.body);

    const {
      userId,
      age,
      gender,
      height,
      weight,
      diet,
      bmi,
      bmiCategory,
      suggestion,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID missing" });
    }
    if (!age || !gender || !height || !weight || !diet) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        age: Number(age),
        gender,
        height: Number(height),
        weight: Number(weight),
        diet,
        bmi: Number(bmi),
        bmiCategory,
        suggestion,
      },
      { new: true },
    );

    console.log("Updated User:", updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Health data updated",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/me", async (req, res) => {
  try {
    const userId = req.user.id; // from middleware

    const user = await User.findById(userId).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add this route to handle the GET request from your Profile component
router.get("/get-health/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Your frontend expects { user: ... } based on res.data.user
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
