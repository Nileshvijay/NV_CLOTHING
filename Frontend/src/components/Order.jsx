import React, { useContext, useEffect, useState } from 'react';
import { OrderContext } from './OrderProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

const Order = () => {
  const { orders } = useContext(OrderContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    // Flatten the orders array if it's nested
    const flattenedOrders = orders.flat();
    setFilteredOrders(flattenedOrders);
  }, [orders]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = orders.flat().filter(order =>
      order.productName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  return (
    <div style={{ marginTop: '60px' }}>
      <div className="container mt-5">
        <h2>Orders</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">Search</button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <tr key={order.id}>
                    <td>{order.productName}</td>
                    <td>{order.category}</td>
                    <td>{order.quantity}</td>
                    <td>${order.total}</td>
                    <td>{order.address}</td>
                    <td>{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
