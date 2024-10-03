import React from 'react';
import './Footer.css';

function Footer() {
  return (
      <footer className="footer">
        <div className="footer-content">
          <nav className="footer-nav">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/buy">Buy</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
          <div className="social-media">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src="/path-to-linkedin-icon.png" alt="LinkedIn" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="/path-to-twitter-icon.png" alt="Twitter" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/path-to-facebook-icon.png" alt="Facebook" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 MediaFlow. All rights reserved. <a href="/impressum">Impressum</a> | <a href="/datenschutz">Datenschutzerklärung</a></p>
        </div>
      </footer>
  );
}

export default Footer;
