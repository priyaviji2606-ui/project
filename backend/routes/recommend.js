// // const express = require('express');
// // const router = express.Router();
// // const axios = require('axios');

// // router.post('/recommend', async (req, res) => {
// //   try {
// //     const { protein_goal, carbs_goal } = req.body;
    
// //     // Call Python ML service
// //     const mlResponse = await axios.post('http://localhost:5001/recommend', {
// //       protein_goal,
// //       carbs_goal
// //     });
    
// //     console.log(mlResponse)
// //     res.json(mlResponse.data);
// //   } catch (error) {
// //     res.status(500).json({ error: 'ML service unavailable' });
// //   }
// // });

// // module.exports = router;


// const express = require('express');
// const router = express.Router();
// const axios = require('axios');
// const User = require("../models/User"); // Ensure you import your User model

// router.post('/', async (req, res) => {
//   try {
//     const { userId } = req.body;

//     // 1. Fetch User details from MongoDB instead of relying on frontend data
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     console.log("Request received for User ID:", req.body.userId);
//     // 2. Logic: Prepare data for Python ML service
//     // We send weight, height, and BMI category so the ML can be "Smart"
//     const mlPayload = {
//       weight: user.weight,
//       height: user.height,
//       bmi: user.bmi,
//       bmiCategory: user.bmiCategory,
//       age: user.age,
//       goal: user.goal || "maintenance" 
//     };

//     console.log(mlPayload);
//     // 3. Call Python ML service
//     const mlResponse = await axios.post('http://localhost:5001/recommend', mlPayload);
    
//     // 4. Return the ML results to the Dashboard
//     res.json(mlResponse.data);

//   } catch (error) {
//     console.error("Integration Error:", error.message);
//     res.status(500).json({ error: 'ML service unavailable or Database error' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require("../models/User");

router.post('/', async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // --- MACRO CALCULATION LOGIC ---
    const weight = user.weight;
    let protein_goal, carbs_goal, note;

    if (user.bmiCategory === "Overweight" || user.bmiCategory === "Obese") {
      protein_goal = Math.round(weight * 2.0); // High protein for fat loss
      carbs_goal = Math.round(weight * 1.5);    // Lower carbs
      note = "Focus on high protein to maintain muscle while losing fat.";
    } else if (user.bmiCategory === "Underweight") {
      protein_goal = Math.round(weight * 1.8); 
      carbs_goal = Math.round(weight * 4.0);    // High carbs for mass gain
      note = "Calorie surplus recommended for healthy weight gain.";
    } else {
      protein_goal = Math.round(weight * 1.5);
      carbs_goal = Math.round(weight * 3.0);
      note = "Balanced maintenance macros based on your BMI.";
    }

    // 2. Prepare Payload for Python
    const mlPayload = {
      protein_goal,
      carbs_goal,
      bmi: user.bmi,
      weight: user.weight
    };

    console.log(mlPayload)

    // 3. Call Python ML service
    const mlResponse = await axios.post('http://localhost:5001/recommend', mlPayload);
    
    // 4. Return EVERYTHING to the Dashboard
    res.json({
      ...mlResponse.data,
      protein: protein_goal,
      carbs: carbs_goal,
      fats: Math.round(weight * 0.8), // General fat estimate
      note: note
    });

  } catch (error) {
    console.error("Integration Error:", error.message);
    res.status(500).json({ error: 'ML service unavailable' });
  }
});

module.exports = router;