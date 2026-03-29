const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');

// 1. LOG A NEW MEAL
router.post('/add', async (req, res) => {
  try {
    const { userId, foodName, volume, mealType, calories, protein, carbs, fats } = req.body;

    const newMeal = new Meal({
      userId,
      foodName,
      volume,
      mealType,
      calories,
      protein,
      carbs,
      fats
    });

    await newMeal.save();
    res.status(201).json({ success: true, message: "Meal logged successfully", meal: newMeal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. GET DAILY TOTALS FOR A USER
router.get('/daily-stats/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Define the start and end of "Today"
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const meals = await Meal.find({
      userId,
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    // Aggregate totals
    const totals = meals.reduce((acc, meal) => {
      acc.calories += meal.calories;
      acc.protein += meal.protein;
      acc.carbs += meal.carbs;
      acc.fats += meal.fats;
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });

    res.json({ success: true, totals, mealHistory: meals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;