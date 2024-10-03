
import React from 'react';
import './HomePage.css';

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Willkommen in der Zukunft Ihres Social Media Erfolgs</h1>
        <p>Willkommen auf unserer Website für professionelles Social Media Management!
          Hier finden Sie alles, was Sie brauchen, um Ihre Marke auf den sozialen Medien erfolgreich zu positionieren und Ihre Zielgruppe effektiv zu erreichen. Egal ob Sie Ihre Followerzahl steigern, eine klare Content-Strategie entwickeln oder kreative Kampagnen umsetzen möchten – wir haben die Tools und das Know-how, um Ihre Social-Media-Präsenz aufs nächste Level zu bringen.</p>
          <div className='services'>
            <h2>Unsere Leistungen:</h2>
            <ul className='services-list'>
              <li>Maßgeschneiderte Social Media Strategien</li>
              <li>Regelmäßiges Posting & Content-Planung</li>
              <li>Performance-Tracking & Analytics</li>
              <li>Community-Management & Engagement</li>
            </ul>
            <p>Lassen Sie uns gemeinsam Ihre Online-Präsenz optimieren! Starten Sie jetzt mit einer kostenlosen Erstberatung.</p>
          </div>
          <p>#SocialMediaManagement #ContentStrategy #OnlineMarketing</p>
        <a href="/about" className="cta-button">Mehr erfahren</a>
      </div>
    </section>
  );
}

export default HeroSection;
