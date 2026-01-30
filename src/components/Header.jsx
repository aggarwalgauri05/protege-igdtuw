import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo-full.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      {/* Logo */}
      <Link to="/" className="logo" onClick={closeMenu}>
        <img src={logo} alt="Protégé Logo" className="logo-img" />
        <span className="logo-text">Protégé IGDTUW</span>
      </Link>
      
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-btn" 
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>

      {/* Navigation */}
      <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/team" onClick={closeMenu}>Team</Link> 
        <Link to="/events" onClick={closeMenu}>Events</Link>
        <Link to="/blogs" onClick={closeMenu}>Blogs</Link>
        <Link to="/faq" onClick={closeMenu}>FAQs</Link>
        <Link to="/mentorship" className="mentorship-link" onClick={closeMenu}>
          <span className="flip-text">
            <span className="flip-front">Mentorship</span>
            <span className="flip-back">XSEED</span>
          </span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;