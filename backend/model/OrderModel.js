const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productName: {
    type: String,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
   
  },
  category:{
    type: String,
  },
  quantity: {
    type: Number,
  
    min: 1
  },
  total: {
    type: Number,
   
    min: 0
  },
  address: {
    type: String,
 
  },
  status: {
    type: String,
    default: 'pending'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
 
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
  
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Order', orderSchema);
