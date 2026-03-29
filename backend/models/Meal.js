const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  foodName: { type: String, required: true },
  volume: { type: String, required: true }, // e.g., "200g" or "1 bowl"
  mealType: { 
    type: String, 
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], 
    required: true 
  },
  calories: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  fats: { type: Number, default: 0 },
  date: { 
    type: Date, 
    default: Date.now // This allows us to filter by "Today"
  }
}, { timestamps: true });

module.exports = mongoose.model('Meal', MealSchema);