import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, provider, signInWithPopup } from '../firebase.js';
import './Login.css';




const Login = () => {

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://gym-app-backend-sm1f.onrender.com/login', { email, password });
      localStorage.setItem('token', response.data.token);
      toast.success("Login successful!");
      navigate('/home');
    } catch (error) {
      
      toast.error("Invalid credentials. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = result.user.accessToken; // Get the access token
      
      // Send this token to your backend to register the user
      const res = await axios.post('https://gym-app-backend-sm1f.onrender.com/auth/google', {
        token,
      });
      localStorage.setItem('token', res.data.token);
      toast.success("Google Sign-In successful!");
      navigate('/home');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      toast.error("Google Sign-In failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
        <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="login-button">Login</button>
        </form>
        <div className="register-link">
          Don't have an account? <a href="/register">Register</a>
        </div>
        <div className="google-login">
  <button onClick={handleGoogleLogin} className="google-login-button">
    <img src="/googlelogo.png" alt="Google Logo" style={{ width: '20px', marginRight: '8px' }} />
    Login with Google
  </button>
</div>

      </div>
    </div>
  );
};

export default Login;
