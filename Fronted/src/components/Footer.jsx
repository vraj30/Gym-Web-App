import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-background">
        <div className="footer-content">
          <div className="footer-section">
            <h2>Contact Us</h2>
            <ul className="contact-info">
              <li><strong>Address: </strong>3rd Floor, Above Bishandayal Jwellers, Kotsafil Main Road, Bhagal, Surat-395003</li>
              <li><strong>Phone:</strong> +91 91067 26098</li>
              <li><strong>Email:</strong> info@powerhousegym.com</li>
            </ul>
          </div>
          <div className="footer-section">
            <h2>Location</h2>
            <div className="map-responsive">
              {/* Replace the iframe URL with your actual map embed code */}
              <iframe
                title="Gym Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.9115491406283!2d72.82604909686135!3d21.195672400058186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f9552a37b91%3A0x18236ba46a050d8f!2sPower%20House%20Gym!5e0!3m2!1sen!2sin!4v1720259322245!5m2!1sen!2sin"                 width="100%"
                height="200"
                frameBorder="0"
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Power House Gym. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
