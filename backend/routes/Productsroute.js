const express = require('express');
const router = express.Router();
const upload = require('../middleware/Upload')
const { addProduct, getAllProducts,getProductById, deleteProductById } = require('../controller/AddprouctCtrl'); // Ensure the path is correct


router.post('/addproduct', upload.single('image'), addProduct);
router.get('/allproducts', getAllProducts);
router.delete('/deleteproduct/:id', deleteProductById);
router.get('/product/:id', getProductById);


module.exports = router;
