// src/components/AboutPage/TeamSection.js
import React from 'react';
import './AboutPage.css';
import Teambild from "./Teambild.jpg";

function TeamSection() {
  return (
    <section className="team-section">
      <h2>Unser Team</h2>
      <div className="team-grid">
        <div className="team-member">
          <h3>Simon Fischer</h3>
          <p>Head of Social Media Stragety</p>
          <p>Simon ist verantwortlich für die Entwicklung und Umsetzung unserer umfassenden Social Media Strategien. Er analysiert Markttrends und Zielgruppen, um maßgeschneiderte Kampagnen zu kreieren, die optimal performen und den Wachstumskurs unserer Kunden unterstützen.</p>
        </div>
        <div className="team-member">
          <h3>Florian Ruffner</h3>
          <p>Crative Content Manager</p>
          <p>Florian sorgt für die kreative Gestaltung und Umsetzung von Inhalten. Er entwickelt einzigartige Posts, Stories und Videos, die genau die richtigen Emotionen wecken und die Marken unserer Kunden authentisch präsentieren.</p>
        </div>
        <div className='team-img'>
          <img src={Teambild} alt="Team Bild"/>
        </div>
        <div className="team-member">
          <h3>Melia Alexander</h3>
          <p>Community Engagement Specialist</p>
          <p>Melia kümmert sich um die Interaktion mit den Zielgruppen. Sie ist die Stimme unserer Kunden auf den sozialen Netzwerken, beantwortet Kommentare, moderiert Diskussionen und sorgt für ein starkes Community-Engagement.</p>
        </div>
        <div className="team-member">
          <h3>Franziska Schöning</h3>
          <p>Performance Marketing Analyst</p>
          <p>Franziska ist für das Monitoring und die Analyse der Kampagnen-Performance zuständig. Sie trackt die wichtigsten KPIs und sorgt dafür, dass alle Strategien datenbasiert optimiert werden, um den maximalen Erfolg zu erzielen.</p>
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
