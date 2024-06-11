const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/auth');
const { addToCart, getCart } = require('../controller/CartCtrl');

router.post('/addToCart', authenticate, addToCart);
router.get('/getCart', authenticate, getCart);

module.exports = router;
