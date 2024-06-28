import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const updateCart = (newCart) => {
    setCart(newCart);
  };

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:8080/api/cart/getCart', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCart(response.data.items);
        } catch (error) {
          console.error('Failed to fetch cart:', error);
        }
      }
    };

    fetchCart();
  }, []);

  const incrementQuantity = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await axios.put(
        `http://localhost:8080/api/cart/increment/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      updateCart(response.data.cart.items);
    } catch (error) {
      console.error('Failed to increment quantity:', error);
    }
  };

  const decrementQuantity = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await axios.put(
        `http://localhost:8080/api/cart/decrement/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      updateCart(response.data.cart.items);
    } catch (error) {
      console.error('Failed to decrement quantity:', error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await axios.delete(
        `http://localhost:8080/api/cart/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      updateCart(response.data.cart.items);
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      await axios.delete('http://localhost:8080/api/cart/clear', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart([]); // Clear the cart state
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, updateCart, incrementQuantity, decrementQuantity, deleteProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

