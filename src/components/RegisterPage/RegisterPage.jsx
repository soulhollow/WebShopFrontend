// src/pages/RegisterPage/RegisterPage.js
import React, { useState } from 'react';
import './RegisterPage.css';
import ApiService from '../../context/ApiService.jsx';  
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Verwende ApiService für die Registrierung
      const userDTO = { username: name, email, password }; // Create userDTO object
      await ApiService.register(userDTO); // Call ApiService register method

      // Handle successful registration
      alert('Registration successful! You can now log in.');
      setError('');
      // Optionally, clear the form
      setName('');
      setEmail('');
      setPassword('');
      navigate('/login');

    } catch (error) {
      // Handle error (API error or network error)
      setError(error.response?.data?.message || 'An error occurred during registration.');
      setSuccess('');
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
