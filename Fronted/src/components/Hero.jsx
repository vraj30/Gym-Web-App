import React from 'react';

const Hero = ({ scrollToPricing, scrollToContact }) => {
  return (
    <section className='hero'>
      <div className="content">
        <div className="title">
          <h1>LET'S</h1>
          <h1>GET</h1>
          <h1>MOVING</h1>
        </div>
        <div className="sub-title">
          <p>Your Journey To Fitness Starts Here!</p>
          <p>Unleash Your Potential!</p>
        </div>
        <div className="buttons">
          <button onClick={scrollToPricing}>Discover Your Plan</button>
          <button onClick={scrollToContact}>Contact Us</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
