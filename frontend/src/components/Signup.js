import React, { useState } from 'react';
import { signup } from '../services/authService';
import { useNavigate } from "react-router-dom";
import './Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await signup(formData); 
            setMessage(result.message); 
            setError(''); 
            navigate('/'); 
        } catch (err) {
            setError(err.message || 'Signup failed'); 
        }
    };

    return (
        <div className='signup'>
        <form onSubmit={handleSubmit} className="signup-form">
            <h2>SignUp</h2>
            <label htmlFor="username">Username</label>
        <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="input-field"
        />
        <label htmlFor="email">Email</label>
        <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="input-field"
        />
        <label htmlFor="password">Password</label>
        <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="input-field"
        />
        <button type="submit" className="submit-button">Sign Up</button>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
    </form>
    </div>
    );
};

export default Signup;
