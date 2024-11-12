// Importiert React und die benötigten Hooks `useEffect` und `useState`
import React, { useEffect, useState } from 'react';
// Importiert den ApiService, um die Hero-Daten aus einer externen Quelle abzurufen
import ApiService from '../../context/ApiService.jsx';
// Importiert das CSS-Stylesheet für das Styling der Hero-Sektion
import './HomePage.css';

// Definiert die HeroSection-Komponente, die den heroischen Abschnitt der Homepage darstellt
function HeroSection() {
  // Definiert den State für Hero-Daten, Ladezustand und Fehlerbehandlung
  const [heroData, setHeroData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect-Hook lädt die Hero-Daten beim ersten Rendern
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        // Definiert die Schlüssel für die Hero-Daten
        const keys = [
          'hero_header',
          'hero_text',
          'hero_services_header',
          'hero_services_list',
          'hero_cta_text',
          'hero_hashtags'
        ];

        // Ruft die Inhalte basierend auf den angegebenen Schlüsseln ab
        const responses = await ApiService.getTextContentsByKeys(keys);

        // Erstellt ein Mapping der abgerufenen Inhalte nach Schlüssel
        const contentMap = {};
        responses.forEach(response => {
          contentMap[response.data.key] = response.data.content;
        });

        // Parst die Liste der Hero-Dienste (falls als JSON gespeichert)
        contentMap['hero_services_list'] = JSON.parse(contentMap['hero_services_list']);

        // Speichert die Hero-Daten im State
        setHeroData(contentMap);
        setLoading(false); // Setzt den Ladezustand auf false
      } catch (err) {
        console.error('Fehler beim Laden der Hero-Daten:', err); // Fehlerprotokollierung in der Konsole
        setError('Es gab ein Problem beim Laden der Hero-Daten.');
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // Zeigt einen Ladehinweis an, solange die Hero-Daten geladen werden
  if (loading) {
    return <p>Loading...</p>;
  }

  // Gibt eine Fehlermeldung aus, falls beim Laden ein Fehler aufgetreten ist
  if (error) {
    return <p>{error}</p>;
  }

  // Rendert die Hero-Daten, wenn sie erfolgreich geladen wurden
  return (
      <section className="hero-section"> {/* Haupt-Container für die Hero-Sektion */}
        <div className="hero-content"> {/* Container für den Inhalt der Hero-Sektion */}
          <h1>{heroData['hero_header']}</h1> {/* Hauptüberschrift des Hero-Bereichs */}
          <p>{heroData['hero_text']}</p> {/* Einleitungstext des Hero-Bereichs */}

          <div className='services'> {/* Container für die Service-Liste */}
            <h2>{heroData['hero_services_header']}</h2> {/* Überschrift für die angebotenen Dienste */}
            <ul className='services-list'>
              {heroData['hero_services_list'].map((service, index) => (
                  <li key={index}>{service}</li> // Liste der angebotenen Dienste
                ))}
            </ul>
            <p>{heroData['hero_cta_text']}</p> {/* CTA-Text unter den Diensten */}
          </div>

          <p>{heroData['hero_hashtags']}</p> {/* Hashtags oder Zusatzinformationen */}
          <a href="/about" className="cta-button">Mehr erfahren</a> {/* CTA-Button, der auf die About-Seite führt */}
        </div>
      </section>
  );
}

export default HeroSection;
