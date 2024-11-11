import React, { useEffect, useState } from 'react';
import ApiService from '../../context/ApiService.jsx';
import './AboutPage.css';

function HowItWorksSection() {
  const [header, setHeader] = useState('');
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHowItWorksData = async () => {
      try {
        const keys = [
          'how_it_works_header',
          'how_it_works_step_1',
          'how_it_works_step_2',
          'how_it_works_step_3'
        ];
        const responses = await ApiService.getTextContentsByKeys(keys);
        const contentMap = {};
        responses.forEach(response => {
          contentMap[response.data.key] = response.data.content;
        });

        setHeader(contentMap['how_it_works_header']);
        const formattedSteps = keys
            .filter(key => key !== 'how_it_works_header')
            .map(key => JSON.parse(contentMap[key]));

        setSteps(formattedSteps);
        setLoading(false);
      } catch (err) {
        console.error('Fehler beim Laden der "Wie es funktioniert"-Daten:', err);
        setError('Es gab ein Problem beim Laden der Daten.');
        setLoading(false);
      }
    };

    fetchHowItWorksData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
      <section className="how-it-works-section">
        <h2>{header}</h2>
        <div className="steps">
          {steps.map((step, index) => (
              <div className="step" key={index}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
          ))}
        </div>
      </section>
  );
}

export default HowItWorksSection;
