const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// 1. PLACE ORDER
router.post('/place', async (req, res) => {
  try {
    const { userId, items, subtotal, deliveryFee, total } = req.body;

    const newOrder = new Order({
      userId,
      items,
      subtotal,
      deliveryFee,
      total,
      status: 'Preparing'
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, orderId: savedOrder._id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. GET LATEST ORDER STATUS (For Delivery.jsx)
router.get('/latest/:userId', async (req, res) => {
  try {
    const order = await Order.findOne({ userId: req.params.userId }).sort({ createdAt: -1 });
    if (!order) return res.status(404).json({ message: "No orders found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. GET USER ORDER HISTORY
router.get('/user-orders/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;