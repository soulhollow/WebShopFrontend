// src/components/BuyPage/CustomerReviewsSection.js
import React from 'react';
import './BuyPage.css';

function CustomerReviewsSection() {
  return (
    <section className="customer-reviews-section">
      <h2>Das sagen unsere Kunden</h2>
      <div className="review-carousel">
        <div className="review-card">
          <p className="customer-name">Anna M.</p>
          <p className="review-text">Fantastisches Team! Unsere Social Media Präsenz hat sich dank der kreativen Strategien und der professionellen Betreuung enorm verbessert. Klare Empfehlung!</p>
          <p className="rating">★★★★★</p>
        </div>
        <div className="review-card">
          <p className="customer-name">David S.</p>
          <p className="review-text">Sehr zufrieden mit der Arbeit! Die Inhalte sind kreativ und sprechen unsere Zielgruppe gut an.</p>
          <p className="rating">★★★★☆</p>
        </div>
        <div className="review-card">
          <p className="customer-name">Lisa K.</p>
          <p className="review-text">Super Betreuung und gute Ergebnisse. Wir haben mehr Reichweite und Engagement erzielt.</p>
          <p className="rating">★★★★☆</p>
        </div>
        {/* Add more reviews as needed */}
      </div>
    </section>
  );
}

export default CustomerReviewsSection;
