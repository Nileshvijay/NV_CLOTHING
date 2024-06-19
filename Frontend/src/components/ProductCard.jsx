import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from './CartProvider'; // Adjust the import path as needed

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { updateCart } = useContext(CartContext); // Use CartContext to get updateCart

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await axios.post(
        'http://localhost:8080/api/cart/addToCart',
        { productId: product._id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      updateCart(response.data.cart.items);

      // Show toast notification on success
      toast.success('Item added to cart successfully!', {
        position: 'top-center', // Center position
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="card mb-4 shadow-sm product-card" style={{ cursor: 'pointer' }}>
      <img src={product.image} className="card-img-top product-image" alt={product.name} onClick={handleCardClick} />
      <div className="card-body">
        <h5 className="card-title product-title" onClick={handleCardClick}>{product.name}</h5>
        <p className="card-text product-description">{product.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="card-text mb-0"><strong>Rating:</strong> {product.rating}</p>
            <p className="card-text"><strong>Price:</strong> ${product.price}</p>
          </div>
          <button className="btn btn-primary add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
      <ToastContainer /> {/* Ensure ToastContainer is included at the root level */}
    </div>
  );
};

export default ProductCard;
