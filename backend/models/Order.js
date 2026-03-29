const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  subtotal: Number,
  deliveryFee: Number,
  total: Number,
  status: { 
    type: String, 
    enum: ['Preparing', 'Packed', 'Out for Delivery', 'Delivered'], 
    default: 'Preparing' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);