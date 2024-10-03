
import React from 'react';
import './AboutPage.css';

function HowItWorksSection() {
  return (
    <section className="how-it-works-section">
      <h2>Wie es funktioniert</h2>
      <div className="steps">
        <div className="step">
          <h3>Schritt 1: Wählen Sie Ihren Tarif</h3>
          <p>Entscheiden Sie sich für den Tarif, der am besten zu Ihren Anforderungen passt.</p>
        </div>
        <div className="step">
          <h3>Schritt 2: Erstellen Sie ihr Profil und teilen Sie Ihre Ziele mit</h3>
          <p>Richten Sie Ihr Profil ein und informieren Sie uns über ihre spezifischen Ziele und Bedürfnisse.</p>
        </div>
        <div className="step">
          <h3>Schritt 3: Profitieren Sie von maßgeschneiderten Plänen</h3>
          <p>Nutzen Sie unsere effektiven und individuell abgestimmten Pläne, um Ihre Ziele optimal zu erreichen.</p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
