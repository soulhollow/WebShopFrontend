// src/components/ContactPage/FAQSection.js
import React, { useEffect, useState } from 'react';
import ApiService from '../../context/ApiService.jsx';
import './ContactPage.css';

// Definieren Sie faqKeys außerhalb der Komponente
const faqKeys = [
  { questionKey: 'faq_social_media_management', answerKey: 'faq_social_media_management_answer' },
  { questionKey: 'faq_ergebnisse_zeit', answerKey: 'faq_ergebnisse_zeit_answer' },
  { questionKey: 'faq_onboarding_prozess', answerKey: 'faq_onboarding_prozess_answer' },
  { questionKey: 'faq_plattformen_betreuung', answerKey: 'faq_plattformen_betreuung_answer' },
  { questionKey: 'faq_flexible_kuendigung', answerKey: 'faq_flexible_kuendigung_answer' },
  { questionKey: 'faq_kostenlose_version', answerKey: 'faq_kostenlose_version_answer' },
];

function FAQSection() {
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        const keys = faqKeys.flatMap(k => [k.questionKey, k.answerKey]);
        const responses = await ApiService.getTextContentsByKeys(keys);
        const contentMap = {};
        responses.forEach(response => {
          contentMap[response.data.key] = response.data.content;
        });
        const formattedData = faqKeys.map(({ questionKey, answerKey }) => ({
          question: contentMap[questionKey],
          answer: contentMap[answerKey],
        }));
        setFaqData(formattedData);
        setLoading(false);
      } catch (err) {
        console.error('Fehler beim Laden der FAQ-Daten:', err);
        setError('Es gab ein Problem beim Laden der FAQ-Daten.');
        setLoading(false);
      }
    };

    fetchFAQData();
  }, []); // Keine Warnung mehr, da faqKeys außerhalb definiert ist

  if (loading) {
    return (
        <section className="faq-section">
          <h2>FAQ</h2>
          <p>Loading...</p>
        </section>
    );
  }

  if (error) {
    return (
        <section className="faq-section">
          <h2>FAQ</h2>
          <p>{error}</p>
        </section>
    );
  }

  return (
      <section className="faq-section">
        <h2>FAQ</h2>
        <div className="faq-list">
          {faqData.map((faq, index) => (
              <div className="faq-item" key={index}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
          ))}
        </div>
      </section>
  );
}

export default FAQSection;
