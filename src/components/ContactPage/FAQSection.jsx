// Importiert React und die benötigten Hooks `useEffect` und `useState`
import React, { useEffect, useState } from 'react';
// Importiert den ApiService, um die FAQ-Daten aus einer externen Quelle abzurufen
import ApiService from '../../context/ApiService.jsx';
// Importiert das CSS-Stylesheet für das Styling der ContactPage-Komponente
import './ContactPage.css';

// Definiert die FAQ-Schlüssel außerhalb der Komponente, um eine konstante Datenstruktur zu gewährleisten
const faqKeys = [
  { questionKey: 'faq_social_media_management', answerKey: 'faq_social_media_management_answer' },
  { questionKey: 'faq_ergebnisse_zeit', answerKey: 'faq_ergebnisse_zeit_answer' },
  { questionKey: 'faq_onboarding_prozess', answerKey: 'faq_onboarding_prozess_answer' },
  { questionKey: 'faq_plattformen_betreuung', answerKey: 'faq_plattformen_betreuung_answer' },
  { questionKey: 'faq_flexible_kuendigung', answerKey: 'faq_flexible_kuendigung_answer' },
  { questionKey: 'faq_kostenlose_version', answerKey: 'faq_kostenlose_version_answer' },
];

// Definiert die FAQSection-Komponente, die häufig gestellte Fragen anzeigt
function FAQSection() {
  const [faqData, setFaqData] = useState([]); // Speichert die FAQ-Daten als Array von Fragen und Antworten
  const [loading, setLoading] = useState(true); // Speichert den Ladezustand
  const [error, setError] = useState(null); // Speichert potenzielle Fehler

  // useEffect-Hook wird einmalig beim Laden der Komponente ausgeführt
  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        // Extrahiert die Schlüssel für Fragen und Antworten, um die Daten abzufragen
        const keys = faqKeys.flatMap(k => [k.questionKey, k.answerKey]);
        const responses = await ApiService.getTextContentsByKeys(keys); // Ruft die Inhalte basierend auf den Schlüsseln ab

        // Erstellt ein Mapping der abgerufenen Inhalte
        const contentMap = {};
        responses.forEach(response => {
          contentMap[response.data.key] = response.data.content;
        });

        // Formatiert die FAQ-Daten als Array von Objekten mit Frage und Antwort
        const formattedData = faqKeys.map(({ questionKey, answerKey }) => ({
          question: contentMap[questionKey],
          answer: contentMap[answerKey],
        }));
        setFaqData(formattedData); // Speichert die formatierten FAQ-Daten im State
        setLoading(false); // Setzt den Ladezustand auf false
      } catch (err) {
        console.error('Fehler beim Laden der FAQ-Daten:', err); // Fehlerprotokollierung in der Konsole
        setError('Es gab ein Problem beim Laden der FAQ-Daten.');
        setLoading(false);
      }
    };

    fetchFAQData();
  }, []); // Keine Abhängigkeiten von Variablen innerhalb der Komponente

  // Zeigt einen Ladehinweis an, solange die FAQ-Daten geladen werden
  if (loading) {
    return (
        <section className="faq-section">
          <h2>FAQ</h2>
          <p>Loading...</p>
        </section>
    );
  }

  // Gibt eine Fehlermeldung aus, falls beim Laden ein Fehler aufgetreten ist
  if (error) {
    return (
        <section className="faq-section">
          <h2>FAQ</h2>
          <p>{error}</p>
        </section>
    );
  }

  // Rendert die FAQ-Sektion mit den geladenen Fragen und Antworten
  return (
      <section className="faq-section"> {/* Haupt-Container für die FAQ-Sektion */}
        <h2>FAQ</h2> {/* Überschrift für die FAQ-Sektion */}
        <div className="faq-list"> {/* Container für die Liste der FAQs */}
          {faqData.map((faq, index) => (
              <div className="faq-item" key={index}> {/* Einzelne FAQ-Item */}
                <h3>{faq.question}</h3> {/* Frage */}
                <p>{faq.answer}</p> {/* Antwort */}
              </div>
          ))}
        </div>
      </section>
  );
}

export default FAQSection;
