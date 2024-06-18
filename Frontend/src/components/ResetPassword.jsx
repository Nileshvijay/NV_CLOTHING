import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords don't match.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8080/api/user/reset-password/${userId}/${token}`, {
        newPassword: newPassword, // Send newPassword as plaintext
      });

      if (response.status === 200) {
        setMessage('Password reset successfully. Redirecting to login page...');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setMessage('Failed to reset password. Please try again.');
      }
    } catch (error) {
      setMessage(`Failed to reset password. Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div className="reset-password-container">
      <form onSubmit={handleSubmit} className="reset-password-form">
        <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
