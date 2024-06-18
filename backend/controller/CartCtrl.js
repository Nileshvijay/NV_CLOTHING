const Cart = require('../model/CartModel');

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      cart = new Cart({ userId: req.user.userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
// Increment quantity of a cart item
const incrementCartItem = async (req, res) => {
  const { productId } = req.params;
  try {
      const cart = await Cart.findOneAndUpdate(
          { userId: req.user.userId, 'items.productId': productId },
          { $inc: { 'items.$.quantity': 1 } },
          { new: true }
      ).populate('items.productId');

      if (!cart) {
          return res.status(404).json({ message: 'Item not found in cart' });
      }

      res.status(200).json({ message: 'Item quantity incremented', cart });
  } catch (error) {
      console.error('Error incrementing quantity:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Decrement quantity of a cart item
const decrementCartItem = async (req, res) => {
  const { productId } = req.params;
  try {
      const cart = await Cart.findOne({ userId: req.user.userId, 'items.productId': productId });

      if (!cart) {
          return res.status(404).json({ message: 'Item not found in cart' });
      }

      const item = cart.items.find(item => item.productId.toString() === productId);
      if (item.quantity <= 1) {
          return res.status(400).json({ message: 'Cannot decrease quantity below 1' });
      }

      item.quantity -= 1;
      await cart.save();

      res.status(200).json({ message: 'Item quantity decremented', cart });
  } catch (error) {
      console.error('Error decrementing quantity:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
module.exports = {
  addToCart,
  getCart,
  incrementCartItem,
  decrementCartItem
};
