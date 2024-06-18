const ProductModel = require('../model/ProductModel');
const cartModel = require('../model/CartModel'); // Import cartModel

const IMG_BASE_URL = 'http://localhost:8080/';

const addProduct = (req, res) => {
    const { name, rating, description, quantity, price, categories } = req.body;

    ProductModel.create({
        name,
        rating,
        description,
        quantity,
        price,
        categories,
        image: IMG_BASE_URL + req.file.filename
    })
    .then(result => res.json({ success: true, data: result }))
    .catch(err => res.status(500).json({ success: false, error: err.message }));
};

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({});
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteProductById = async (req, res) => {
    try {
        const delProduct = await ProductModel.findByIdAndDelete(req.params.id);
        if (!delProduct) {
            return res.status(404).json({ message: "Product doesn't exist" });
        }
        res.json(delProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    deleteProductById
  
};
