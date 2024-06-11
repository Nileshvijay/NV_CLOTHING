import React, { useState } from 'react';
import { FaSearch, FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';


const ManageOrders = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const orders = [
        { id: '1234', product: 'Shirt', customer: 'John Doe', date: '2024-05-20', status: 'Pending' },
        { id: '5678', product: 'Jeans', customer: 'Jane Smith', date: '2024-05-21', status: 'Shipped' },
        // Add more orders here
    ];

    const filteredOrders = orders.filter(order => {
        const matchesSearchTerm = order.id.includes(searchTerm);
        const matchesStartDate = startDate ? new Date(order.date) >= new Date(startDate) : true;
        const matchesEndDate = endDate ? new Date(order.date) <= new Date(endDate) : true;
        return matchesSearchTerm && matchesStartDate && matchesEndDate;
    });

    return (
        <div className="container-fluid p-3" style={{ marginTop: '60px', backgroundColor: '#f8f9fa' }}>
            <div className="manage-orders-section mt-5">
                <div className="row mb-4">
                    <div className="col-md-4">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Product ID"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button">
                                    <FaSearch />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <input
                            type="date"
                            className="form-control"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="date"
                            className="form-control"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2 text-right">
                        <button className="btn btn-success">Add Order</button>
                    </div>
                </div>
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Order ID</th>
                            <th>Product</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.product}</td>
                                <td>{order.customer}</td>
                                <td>{order.date}</td>
                                <td>{order.status}</td>
                                <td>
                                    <FaEye className="action-icon text-primary" />
                                    <FaEdit className="action-icon text-warning mx-2" />
                                    <FaTrashAlt className="action-icon text-danger" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;

