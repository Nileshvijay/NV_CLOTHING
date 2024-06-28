const express = require('express');
const router = express.Router();
const{addOrder,getOrders} = require('../controller/OrderCtrl');
const auth = require('../middleware/auth');

router.post('/addorder', auth, addOrder);
router.get('/getorders', auth, getOrders);
module.exports = router;
