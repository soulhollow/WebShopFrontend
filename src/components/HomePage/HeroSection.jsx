import React, { useEffect, useState } from 'react';
import ApiService from '../../context/ApiService.jsx';
import './HomePage.css';

function HeroSection() {
  const [heroData, setHeroData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const keys = [
          'hero_header',
          'hero_text',
          'hero_services_header',
          'hero_services_list',
          'hero_cta_text',
          'hero_hashtags'
        ];
        const responses = await ApiService.getTextContentsByKeys(keys);
        const contentMap = {};
        responses.forEach(response => {
          contentMap[response.data.key] = response.data.content;
        });

        contentMap['hero_services_list'] = JSON.parse(contentMap['hero_services_list']);
        setHeroData(contentMap);
        setLoading(false);
      } catch (err) {
        console.error('Fehler beim Laden der Hero-Daten:', err);
        setError('Es gab ein Problem beim Laden der Hero-Daten.');
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
      <section className="hero-section">
        <div className="hero-content">
          <h1>{heroData['hero_header']}</h1>
          <p>{heroData['hero_text']}</p>
          <div className='services'>
            <h2>{heroData['hero_services_header']}</h2>
            <ul className='services-list'>
              {heroData['hero_services_list'].map((service, index) => (
                  <li key={index}>{service}</li>
              ))}
            </ul>
            <p>{heroData['hero_cta_text']}</p>
          </div>
          <p>{heroData['hero_hashtags']}</p>
          <a href="/about" className="cta-button">Mehr erfahren</a>
        </div>
      </section>
  );
}

export default HeroSection;
