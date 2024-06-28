const Order = require('../model/OrderModel');

const addOrder = async (req, res) => {
  const { orders } = req.body;
  console.log(req.body);
  if (!orders || !Array.isArray(orders)) {
    return res.status(400).json({ message: 'Invalid order format' });
  }

  try {
    for (const order of orders) {
      const newOrder = new Order({
        ...order,
        userId: req.user.userId
      });
      await newOrder.save();
    }
    res.status(200).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Failed to add order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  addOrder,
  getOrders,
};
