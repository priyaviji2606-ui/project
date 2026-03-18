const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/recommend', async (req, res) => {
  try {
    const { protein_goal, carbs_goal } = req.body;
    
    // Call Python ML service
    const mlResponse = await axios.post('http://localhost:5001/recommend', {
      protein_goal,
      carbs_goal
    });
    
    res.json(mlResponse.data);
  } catch (error) {
    res.status(500).json({ error: 'ML service unavailable' });
  }
});

module.exports = router;
