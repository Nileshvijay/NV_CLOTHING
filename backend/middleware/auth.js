const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, 'yourSecretKey'); // replace 'yourSecretKey' with your actual secret key
    if (!decoded.userId || !mongoose.Types.ObjectId.isValid(decoded.userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    req.user = { userId: decoded.userId }; // Use userId consistently
    next();
  } catch (error) {
    console.error('Authentication error:', error.message); // Log the error message
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticate;

