import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './VerifyEmail.css';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const verifyEmail = async () => {
    try {
      const res = await axios.get(`https://gym-app-backend-sm1f.onrender.com/verify/${token}`);
      console.log('Verification success:', res.data.msg);
      toast.success(res.data.msg);
      setVerified(true);

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      console.log('Verification error:', err.response?.data?.msg || 'Server error. Please try again later.');
      //toast.error(err.response?.data?.msg || 'Verification failed');
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="verify-email-container">
      <div className="verify-email-card">
        {loading ? (
          <>
            <h2>Verifying Your Email...</h2>
            <p>Please wait while we verify your email address.</p>
            <div className="loader"></div>
          </>
        ) : (
          <>
            <h2>
              {verified ? (
                <>
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', marginRight: '10px' }} />
                  Email Verified
                </>
              ) : (
                'Verification Failed'
              )}
            </h2>
            <p>{verified ? 'You can now login!' : error}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
