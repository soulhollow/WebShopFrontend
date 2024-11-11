import React, { useEffect, useState } from 'react';
import ApiService from '../../context/ApiService.jsx';
import './BuyPage.css';

function FeaturesComparisonSection() {
  const [header, setHeader] = useState('');
  const [featuresData, setFeaturesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturesData = async () => {
      try {
        const keys = [
          'features_comparison_header',
          'feature_comparison_1',
          'feature_comparison_2',
          'feature_comparison_3',
          'feature_comparison_4'
        ];
        const responses = await ApiService.getTextContentsByKeys(keys);
        const contentMap = {};
        responses.forEach(response => {
          contentMap[response.data.key] = response.data.content;
        });

        setHeader(contentMap['features_comparison_header']);
        const formattedFeatures = keys
            .filter(key => key !== 'features_comparison_header')
            .map(key => JSON.parse(contentMap[key]));

        setFeaturesData(formattedFeatures);
        setLoading(false);
      } catch (err) {
        console.error('Fehler beim Laden der Features-Daten:', err);
        setError('Es gab ein Problem beim Laden der Features-Daten.');
        setLoading(false);
      }
    };

    fetchFeaturesData();
  }, []); // Abhängigkeitenliste bleibt leer

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
      <section className="features-comparison-section">
        <h2>{header}</h2>
        <table className="comparison-table">
          <thead>
          <tr>
            <th>Feature</th>
            <th>Product A</th>
            <th>Product B</th>
            <th>Product C</th>
            <th>Product D</th>
          </tr>
          </thead>
          <tbody>
          {featuresData.map((feature, index) => (
              <tr key={index}>
                <td>{feature.feature}</td>
                <td>{feature.productA}</td>
                <td>{feature.productB}</td>
                <td>{feature.productC}</td>
                <td>{feature.productD}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </section>
  );
}

export default FeaturesComparisonSection;
