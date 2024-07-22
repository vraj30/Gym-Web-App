import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EnrollForm.css'; // Import the CSS file
import { toast } from 'react-toastify';

const EnrollForm = () => {
  const location = useLocation();
  const { planType: initialPlanType } = location.state || {};
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // New state for email
  const [mobile, setMobile] = useState('');
  const [planType, setPlanType] = useState(initialPlanType || ''); // Initialize with the received planType
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return; // Exit early if no token found
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const res = await axios.get('https://gym-app-backend-sm1f.onrender.com/api/users/me', config);
        console.log('Fetched user data:', res.data); // Debug: Check the fetched user data
        setName(res.data.name);
        setEmail(res.data.email); // Set email from fetched user data
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      email, 
      mobile,
      planType
    };

    try {
      await axios.post('https://gym-app-backend-sm1f.onrender.com/api/enroll', formData);
      toast.success("Successfully Enrolled! Power House Team will contact you soon!");
      navigate('/home'); 
    } catch (error) {
      toast.error("Error Enrolling!");
    }
  };

  return (
    <div className="enroll-form-page">
      <div className="enroll-form">
        <h1>Enroll Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" value={name} readOnly />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="text" value={email} readOnly /> {/* Display email */}
          </div>
          <div className="form-group">
            <label>Mobile No:</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Plan Type:</label>
            <select
              value={planType}
              onChange={(e) => setPlanType(e.target.value)}
              required
            >
              <option value="" disabled>Select your plan</option>
              <option value="MONTHLY">Monthly</option>
              <option value="HALF_YEARLY">Half Yearly</option>
              <option value="YEARLY">Yearly</option>
            </select>
          </div>
          <div className="button-container">
            <button type="submit" className="enroll-button">Submit</button>
            <button type="button" className="back-button" onClick={() => navigate('/home')}>Back</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollForm;
