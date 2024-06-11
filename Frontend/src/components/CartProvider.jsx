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

  return (
    <CartContext.Provider value={{ cart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
