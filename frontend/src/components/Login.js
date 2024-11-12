
import React, { useState } from 'react';
import { login } from '../services/authService';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
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
            const result = await login(formData);
            setMessage(result.message);
            localStorage.setItem('token', result.token); 
            setError('');
            navigate('/employees'); 
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div className='login'>
        <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email" >Email</label>
            <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
            />
            <label htmlFor="password" >Password</label>
            <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
            />
           <button type="submit" className="login-button">Login</button>
{message && <p className="success-message">{message}</p>}
{error && <p className="error-message">{error}</p>}
</form>
<p className="signup-text">
    Don't have an account? <Link to="/signup">Sign Up</Link>
</p>

    </div>
    </div>
);
};


export default Login;
