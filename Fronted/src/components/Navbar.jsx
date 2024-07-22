import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return; 
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const res = await axios.get('http://localhost:8080/api/users/me', config);
        console.log('Fetched user data:', res.data); // Debug: Check the fetched user data
        setUserName(res.data.name);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header>
    <p className="header-title">POWER HOUSE GYM</p>
    <div className="user-info">
      {userName ? (
        <>
          <p>Welcome, {userName}</p>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </>
      ) : (
        <Link to="/login" className="login-button">Log in</Link>
      )}
    </div>
  </header>
  
  );
};

export default Navbar;
