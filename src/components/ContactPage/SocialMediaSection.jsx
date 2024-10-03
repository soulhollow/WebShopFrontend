// src/components/ContactPage/SocialMediaSection.js
import React from 'react';
import './ContactPage.css';

function SocialMediaSection() {
  return (
    <section className="social-media-section">
      <h2>Connect with Us</h2>
      <div className="social-media-icons">
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
    </section>
  );
}

export default SocialMediaSection;
