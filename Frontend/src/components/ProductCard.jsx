import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CartContext } from './CartProvider'; // Adjust the import path as needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './ProductCard.css'; // Import your CSS file for styling

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
      // Show error toast notification if adding to cart fails
      toast.error('Failed to add item to cart. Please try again.');
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
            <p className="card-text mb-0"><FontAwesomeIcon icon={faStar} className="text-warning" /> {product.rating}</p>
            <p className="card-text"><strong>Price:</strong> ${product.price}</p>
          </div>
          <button className="btn btn-primary add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
