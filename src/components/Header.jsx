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
        <Link to="/events">Events</Link>
        <Link to="/mentorship">Mentorship</Link>
           <Link to="/blogs">Blogs</Link>
        <Link to="/faq">FAQs</Link>
        
      </nav>
    </header>
  );
};

export default Header;