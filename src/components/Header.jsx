import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Protégé IGDTUW</div>
      <nav className="nav">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Team</a>
        <a href="#">Events</a>
        <a href="#">Mentorship</a>
        <a href="#">Blogs</a>
        <a href="#">FAQs</a>
        
      </nav>
    </header>
  );
};

export default Header;
