import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const Visitors = () => {
    const [visitors, setVisitors] = useState([]);

    useEffect(() => {
        fetchVisitors();
    }, []);

    const fetchVisitors = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/user/visitor');
            setVisitors(response.data);
        } catch (error) {
            console.error('Error fetching visitors:', error);
        }
    };
    
    const handleDeleteVisitor = async (_id) => {
        try {
            await axios.delete(`http://localhost:8080/api/user/delete/${_id}`);
            fetchVisitors(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting visitor:', error);
        }
    };

    const handleMakeAdmin = async (visitorId) => {
        try {
            await axios.put(`http://localhost:8080/api/user/updateRole/${visitorId}`);
            fetchVisitors(); // Refresh the list after updating role
        } catch (error) {
            console.error('Error making admin:', error);
        }
    };

    return (
        <div className="visitors-container">
            <h1 className="visitors-heading">Visitor Information</h1>
            <table className="visitors-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Age</th>
                        <th>Role</th>
                        <th>IsAdmin</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {visitors.map(visitor => (
                        <tr key={visitor._id}>
                            <td>{visitor.name}</td>
                            <td>{visitor.email}</td>
                            <td>{visitor.mobile}</td>
                            <td>{visitor.age}</td>
                            <td>{visitor.role}</td>
                            <td>
                                {visitor.admin ? (
                                    <span role="img" aria-label="Admin">
                                        👨‍💼 Yes
                                    </span>
                                ) : (
                                    <span role="img" aria-label="User">
                                        👤 No
                                    </span>
                                )}
                            </td>
                            <td>
                                <FaEdit className="edit-icon" />
                                <FaTrash className="delete-icon" onClick={() => handleDeleteVisitor(visitor._id)} />
                                <button onClick={() => handleMakeAdmin(visitor._id)}>Make Admin</button>
                               
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Visitors;

