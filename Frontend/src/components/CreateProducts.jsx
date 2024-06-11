import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductCard from './ProductCard';

const Products = ({ category }) => {
  const { products } = useContext(ProductContext);
  const filteredProducts = products.filter(product => product.categories.toLowerCase() === category.toLowerCase());

  return (
    <div className="container">
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)}'s Products</h1>
      <h1>nilesh</h1>
      <div className="row">
        {filteredProducts.map(product => (
          <div className="col-md-4" key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
