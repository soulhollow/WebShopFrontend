import React, { useEffect, useState } from 'react';
import ApiService from '../../context/ApiService.jsx';
import './HomePage.css';
import flexibel from './Flexibel.png';
import effektiv from './Effektiv.jpg';
import individuell from './Individuell.jpg';

function FeaturesSection() {
  const [header, setHeader] = useState('');
  const [featuresData, setFeaturesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturesData = async () => {
      try {
        const keys = [
          'features_section_header',
          'feature_1',
          'feature_2',
          'feature_3'
        ];
        const responses = await ApiService.getTextContentsByKeys(keys);
        const contentMap = {};
        responses.forEach(response => {
          contentMap[response.data.key] = response.data.content;
        });

        setHeader(contentMap['features_section_header']);
        const formattedFeatures = [
          { ...JSON.parse(contentMap['feature_1']), image: flexibel },
          { ...JSON.parse(contentMap['feature_2']), image: individuell },
          { ...JSON.parse(contentMap['feature_3']), image: effektiv }
        ];

        setFeaturesData(formattedFeatures);
        setLoading(false);
      } catch (err) {
        console.error('Fehler beim Laden der Features-Daten:', err);
        setError('Es gab ein Problem beim Laden der Features-Daten.');
        setLoading(false);
      }
    };

    fetchFeaturesData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
      <section className="features-section">
        <h2>{header}</h2>
        <div className="features-grid">
          {featuresData.map((feature, index) => (
              <div className="feature-card" key={index}>
                <img src={feature.image} alt={feature.title} />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
          ))}
        </div>
      </section>
  );
}

export default FeaturesSection;
