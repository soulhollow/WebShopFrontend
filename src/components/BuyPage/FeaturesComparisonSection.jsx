import React, { useEffect, useState } from 'react';
import ApiService from '../../context/ApiService.jsx';
import './BuyPage.css';

function FeaturesComparisonSection() {
  const [header, setHeader] = useState('');
  const [featuresData, setFeaturesData] = useState([]);
  const [productNames, setProductNames] = useState({
    productA: 'Produkt A',
    productB: 'Produkt B',
    productC: 'Produkt C',
    productD: 'Produkt D',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const keys = [
          'features_comparison_header',
          'feature_comparison_1',
          'feature_comparison_2',
          'feature_comparison_3',
          'feature_comparison_4',
          'product_name_A',
          'product_name_B',
          'product_name_C',
          'product_name_D',
        ];
        const responses = await ApiService.getTextContentsByKeys(keys);
        const contentMap = {};
        responses.forEach(response => {
          contentMap[response.data.key] = response.data.content;
        });

        setHeader(contentMap['features_comparison_header']);
        const formattedFeatures = keys
            .filter(key => key.startsWith('feature_comparison_'))
            .map(key => JSON.parse(contentMap[key]));

        setFeaturesData(formattedFeatures);
        setProductNames({
          productA: contentMap['product_name_A'],
          productB: contentMap['product_name_B'],
          productC: contentMap['product_name_C'],
          productD: contentMap['product_name_D'],
        });
        setLoading(false);
      } catch (err) {
        console.error('Fehler beim Laden der Daten:', err);
        setError('Es gab ein Problem beim Laden der Daten.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
            <th>{productNames.productA}</th>
            <th>{productNames.productB}</th>
            <th>{productNames.productC}</th>
            <th>{productNames.productD}</th>
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
