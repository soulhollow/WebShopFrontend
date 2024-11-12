// Importiert React und die benötigten Hooks `useEffect` und `useState`
import React, { useEffect, useState } from 'react';

// Importiert den ApiService, um Daten aus einer externen Quelle abzurufen
import ApiService from '../../context/ApiService.jsx';

// Importiert das CSS-Stylesheet für das Styling der BuyPage
import './BuyPage.css';

// Definiert die CustomerReviewsSection-Komponente, die die Kundenbewertungen anzeigt
function CustomerReviewsSection() {
  const [reviewsData, setReviewsData] = useState([]); // Speichert die Kundenbewertungen
  const [header, setHeader] = useState(''); // Speichert den Header für den Bewertungsabschnitt
  const [loading, setLoading] = useState(true); // Speichert den Ladezustand
  const [error, setError] = useState(null); // Speichert potenzielle Fehler

  // useEffect-Hook lädt Daten beim ersten Rendern
  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
        const keys = [
          'customer_reviews_header',
          'customer_review_1',
          'customer_review_2',
          'customer_review_3'
        ];

        // Ruft Inhalte basierend auf den Schlüsseln ab
        const responses = await ApiService.getTextContentsByKeys(keys);

        // Erstellt ein Mapping der abgerufenen Inhalte
        const contentMap = {};
        responses.forEach(response => {
          contentMap[response.data.key] = response.data.content;
        });

        setHeader(contentMap['customer_reviews_header']);

        // Formatiert die Bewertungen
        const formattedReviews = keys
            .filter(key => key !== 'customer_reviews_header')
            .map(key => JSON.parse(contentMap[key]));

        setReviewsData(formattedReviews);
        setLoading(false);
      } catch (err) {
        console.error('Fehler beim Laden der Kundenbewertungen:', err);
        setError('Es gab ein Problem beim Laden der Kundenbewertungen.');
        setLoading(false);
      }
    };

    fetchReviewsData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
      <section className="customer-reviews-section">
        <h2>{header}</h2>
        <div className="review-carousel">
          {reviewsData.map((review, index) => (
              <div className="review-card" key={index}>
                <p className="customer-name">{review.name}</p>
                <p className="review-text">{review.text}</p>
                <p className="rating">{review.rating}</p>
              </div>
          ))}
        </div>
      </section>
  );
}

export default CustomerReviewsSection;
