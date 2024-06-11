const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const Authrouter = require('./routes/Authroute');
const productrouter = require('./routes/Productsroute');
const bannerroute = require('./routes/Bannerroute')
const Cartrouter =require('../backend/routes/Cartroute')
const connection = require('./database/DbConnect'); // Ensure this connects to your database

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware setup
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static file setup
app.use('/static', express.static(__dirname + '/public/Images'));
app.use(express.static('public/Images'));

// Route setups
app.use("/api/user", Authrouter);
app.use('/api/product', productrouter);
app.use('/api/banner', bannerroute);
app.use('/api/cart',Cartrouter)

// Database connection
connection();

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
