const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/auth');
const { addToCart, getCart,incrementCartItem, decrementCartItem } = require('../controller/CartCtrl');

router.post('/addToCart', authenticate, addToCart);

router.get('/getCart', authenticate, getCart);
// Route to increment the quantity of a cart item
router.put('/increment/:productId', authenticate, incrementCartItem);

// Route to decrement the quantity of a cart item
router.put('/decrement/:productId', authenticate, decrementCartItem);

module.exports = router;
