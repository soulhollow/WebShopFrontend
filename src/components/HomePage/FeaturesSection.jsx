
import React from 'react';
import './HomePage.css';
import flexibel from './Flexibel.png';
import individuell from './Individuell.jpg'
import effektiv from './Effektiv.jpg';

function FeaturesSection() {
  return (
    <section className="features-section">
      <h2>Key Features</h2>
      <div className="features-grid">
        <div className="feature-card">
          <img src={flexibel}/>
          <h3>Flexibel</h3>
          <p>Bei MediaFlow sind Sie vollkommen flexibel: Passen Sie Ihren Tarif jederzeit an - ganz nach ihren individuellen Bedürfnissen.</p>
        </div>
        <div className="feature-card">
          <img src={individuell} />
          <h3>Individuell</h3>
          <p>MediaFlow richtet sich exakt nach Ihren Anforderungen - maßgeschneidert auf Ihr Unternehmen und spezifischen Zielen.</p>
        </div>
        <div className="feature-card">
          <img src={effektiv} />
          <h3>Effektiv</h3>
          <p>Mit MediaFlow arbeiten Sie effizient und zielgerichtet. Dank unseres Fachwissens sind unsere Strategien so optimiert, dass Sie Ihre Ziele möglich schnell und effektiv erreichen.</p>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
