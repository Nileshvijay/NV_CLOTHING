import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get('http://localhost:8080/api/orders/getorders', config);
        if (response.data && Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          throw new Error('Invalid response data');
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const addOrder = async (newOrder) => {
    try {
      console.log('New Order:', newOrder);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.post('http://localhost:8080/api/orders/addorder', newOrder, config);
      if (response.status === 200) {
        setOrders((prevOrders) => [...prevOrders, ...newOrder.orders]);
        toast.success('Order placed successfully!');
      } else {
        throw new Error('Failed to place the order');
      }
    } catch (error) {
      console.error('Failed to add order:', error);
      toast.error('Failed to place the order. Please try again.');
    }
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
