import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Protégé IGDTUW</div>
      <nav className="nav">
        <Link to="/">Home</Link>
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