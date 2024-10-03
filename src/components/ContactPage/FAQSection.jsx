// src/components/ContactPage/FAQSection.js
import React from 'react';
import './ContactPage.css';

function FAQSection() {
  return (
    <section className="faq-section">
      <h2>FAQ</h2>
      <div className="faq-list">
        <div className="faq-item">
          <h3>Was umfasst das Social Media Management genau?</h3>
          <p>Unser Social Media Management umfasst die Erstellung von Inhalten, die Pflege von Social-Media-Profilen, das Community Management, die Analyse von Erfolgsmetriken und die Optimierung der Social-Media-Strategie für eine bestmögliche Performance.</p>
        </div>
        <div className="faq-item">
          <h3>Wie lange dauert es, bis Ergebnisse sichtbar werden?</h3>
          <p>Ergebnisse können je nach Ziel und Plattform variieren. In der Regel sind erste Veränderungen in Reichweite und Engagement nach 1-2 Monaten sichtbar, während signifikante Erfolge oft nach 3-6 Monaten zu erwarten sind.</p>
        </div>
        <div className="faq-item">
          <h3>Wie sieht der Onboarding Prozess aus?</h3>
          <p>Zu Beginn führen wir ein ausführliches Gespräch, um Ihre Ziele, Zielgruppe und Markenidentität zu verstehen. Anschließend erstellen wir eine maßgeschneiderte Strategie, die den Grundstein für alle zukünftigen Aktivitäten legt.</p>
        </div>
        <div className="faq-item">
          <h3>Welche Plattformen betreut MediaFlow?</h3>
          <p>Wir betreuen eine Vielzahl von Social-Media-Plattformen, darunter Instagram, Facebook, LinkedIn, Twitter, TikTok und Pinterest. Auf Anfrage unterstützen wir auch andere Netzwerke, die zu Ihrer Zielgruppe passen.</p>
        </div>
        <div className="faq-item">
          <h3>Kann ich mein Abonnement flexibel kündigen?</h3>
          <p>Das Abonnement kann jederzeit ohne langfristige Vertragsbindung gekündigt oder verändert werden. Es entstehen keine zusätzlichen Kosten durch die Beendigung des Abonnements.</p>
        </div>
        <div className="faq-item">
          <h3>Gibt es eine kostenlose Version?</h3>
          <p>Eine kostenlose Version unseres Social Media Managements bieten wir nicht an, da die Entwicklung einer individuellen Strategie und die kontinuierliche Betreuung einen erheblichen Zeit- und Ressourcenaufwand erfordern. Jede Kampagne wird sorgfältig geplant und optimiert, um die bestmöglichen Ergebnisse für Ihr Unternehmen zu erzielen.</p>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
