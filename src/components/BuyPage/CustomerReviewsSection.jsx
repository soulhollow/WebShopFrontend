import React, { useEffect, useState } from 'react';
import ApiService from '../../context/ApiService.jsx';
import './BuyPage.css';

function CustomerReviewsSection() {
  const [reviewsData, setReviewsData] = useState([]);
  const [header, setHeader] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
        const keys = [
          'customer_reviews_header',
          'customer_review_1',
          'customer_review_2',
          'customer_review_3'
        ];
        const responses = await ApiService.getTextContentsByKeys(keys);
        const contentMap = {};
        responses.forEach(response => {
          contentMap[response.data.key] = response.data.content;
        });

        setHeader(contentMap['customer_reviews_header']);
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
  }, []); // Keine Abhängigkeiten von lokalen Variablen wie contentMap

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
