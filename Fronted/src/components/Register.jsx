import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const { name, email, password, repeatPassword } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault(); 
    try {
      const res = await axios.post('http://localhost:8080/register', formData);
      console.log(res.data); // Check the response data
  
    
      toast.success("User Registered Successfully!", {
        onClose: () => {
          window.location.href = '/login'; // Redirect to login page after toast is closed
        }
      });
  
    } catch (err) {
      console.error(err.response.data); // Log the error response
      toast.error("There is a problem in registering the user!"); // Display error to the user
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={onSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={name} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="repeat-password">Repeat Password:</label>
          <input type="password" id="repeat-password" name="repeatPassword" value={repeatPassword} onChange={onChange} required />
        </div>
        <button type="submit" className="register-button">Register</button>
        <div className="login-link">
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
