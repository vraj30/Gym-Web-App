import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WorkoutSessions from "./components/WorkoutSessions";
import Gallery from "./components/Gallery";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import BMICalc from "./components/BMICalc";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import EnrollForm from "./components/EnrollForm";  
import VerifyEmail from './components/VerifyEmail';

const App = () => {
  const pricingRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToPricing = () => {
    pricingRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/enroll" element={<EnrollForm />} /> {/* Add EnrollForm route */}
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/home" element={
          <>
            <Navbar />
            <Hero scrollToPricing={scrollToPricing} scrollToContact={scrollToContact} />
            <WorkoutSessions />
            <Gallery />
            <section ref={pricingRef}>
              <Pricing />
            </section>
            <BMICalc />
            <section ref={contactRef}>
              <Contact />
            </section>
            <Footer />
          </>
        } />
        
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
      <ToastContainer theme='dark' position='top-center' />
    </Router>
  );
};

export default App;
