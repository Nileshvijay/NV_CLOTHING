import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/product/allproducts');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const fetchProductById = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/product/product/${productId}`);
      setSelectedProduct(response.data);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, selectedProduct, fetchProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
