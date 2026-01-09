
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo-full.png'; // Add this line

const Header = () => {
  return (
    <header className="header">
      {/* Link the Logo to Home */}
      <Link to="/" className="logo">
  <img src={logo} alt="Protégé Logo" className="logo-img" />
  <span className="logo-text">Protégé IGDTUW</span>
</Link>
      
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/team">Team</Link> 
        <Link to="/events">Events</Link>
        {/* <Link to="/mentorship">Mentorship</Link> */}
           <Link to="/blogs">Blogs</Link>
        <Link to="/faq">FAQs</Link>
        
      </nav>
    </header>
  );
};


export default Header;