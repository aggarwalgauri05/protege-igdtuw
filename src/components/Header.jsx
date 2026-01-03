import React from 'react';
import { Link } from 'react-router-dom'; // <--- Add this import
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      {/* Link the Logo to Home */}
      <Link to="/" className="logo">Protégé IGDTUW</Link> 
      
      <nav className="nav">
        <Link to="/">Home</Link>
        <a href="#">About</a>
        <Link to="/team">Team</Link> 
        <a href="#">Events</a>
        <a href="#">Mentorship</a>
        <a href="#">Blogs</a>
        <a href="#">FAQs</a>
      </nav>
    </header>
  );
};

export default Header;