import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/user/forgotPassword', { email });

      if (response.status === 200) {
        setMessage('Password reset email sent. Please check your inbox.');
      } else {
        setMessage('Failed to send password reset email.');
      }
    } catch (error) {
      setMessage(`Failed to send password reset email. Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Email</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
