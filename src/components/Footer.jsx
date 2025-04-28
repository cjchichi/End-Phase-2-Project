import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Moca Blog</h3>
          <p>Sharing stories, ideas, and knowledge with the world.</p>
          
          <div className="social-links">
            <a href="https://x.com/mocablog" target="_blank" rel="noopener noreferrer">X</a>
            <a href="https://linkedin.com/mocablog" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://instagram.com/mocablog" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
          
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li><Link to="/category/technology">Technology</Link></li>
            <li><Link to="/category/travel">Travel</Link></li>
            <li><Link to="/category/food">Food</Link></li>
            <li><Link to="/category/lifestyle">Lifestyle</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Moca Blog. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
