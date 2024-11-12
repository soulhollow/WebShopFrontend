// Importiert React und die benötigten Hooks `useEffect` und `useState`
import React, { useEffect, useState } from 'react';
// Importiert den ApiService, um die Features-Daten aus einer externen Quelle abzurufen
import ApiService from '../../context/ApiService.jsx';
// Importiert das CSS-Stylesheet für das Styling der Features-Sektion
import './HomePage.css';

// Importiert die Bilder, die für jedes Feature angezeigt werden sollen
import flexibel from './Flexibel.png';
import effektiv from './Effektiv.jpg';
import individuell from './Individuell.jpg';

// Definiert die FeaturesSection-Komponente, die die Merkmale oder Vorteile des Produkts anzeigt
function FeaturesSection() {
  // Definiert den State für Header, Features-Daten, Ladezustand und Fehler
  const [header, setHeader] = useState('');
  const [featuresData, setFeaturesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect-Hook lädt die Features-Daten beim ersten Rendern
  useEffect(() => {
    const fetchFeaturesData = async () => {
      try {
        // Definiert die Schlüssel für die Features-Daten
        const keys = [
          'features_section_header',
          'feature_1',
          'feature_2',
          'feature_3'
        ];

        // Ruft die Inhalte basierend auf den angegebenen Schlüsseln ab
        const responses = await ApiService.getTextContentsByKeys(keys);

        // Erstellt ein Mapping der abgerufenen Inhalte nach Schlüssel
        const contentMap = {};
        responses.forEach(response => {
          contentMap[response.data.key] = response.data.content;
        });

        // Setzt den Header für die Features-Sektion
        setHeader(contentMap['features_section_header']);

        // Formatiert die Features-Daten und fügt die jeweiligen Bilder hinzu
        const formattedFeatures = [
          { ...JSON.parse(contentMap['feature_1']), image: flexibel },
          { ...JSON.parse(contentMap['feature_2']), image: individuell },
          { ...JSON.parse(contentMap['feature_3']), image: effektiv }
        ];

        // Speichert die formatierten Features-Daten im State
        setFeaturesData(formattedFeatures);
        setLoading(false); // Setzt den Ladezustand auf false
      } catch (err) {
        console.error('Fehler beim Laden der Features-Daten:', err); // Fehlerprotokollierung in der Konsole
        setError('Es gab ein Problem beim Laden der Features-Daten.');
        setLoading(false);
      }
    };

    fetchFeaturesData();
  }, []);

  // Zeigt einen Ladehinweis an, solange die Features-Daten geladen werden
  if (loading) {
    return <p>Loading...</p>;
  }

  // Gibt eine Fehlermeldung aus, falls beim Laden ein Fehler aufgetreten ist
  if (error) {
    return <p>{error}</p>;
  }

  // Rendert die Features-Daten, wenn sie erfolgreich geladen wurden
  return (
      <section className="features-section"> {/* Haupt-Container für die Features-Sektion */}
        <h2>{header}</h2> {/* Header der Features-Sektion */}
        <div className="features-grid"> {/* Grid-Layout für die Features-Karten */}
          {featuresData.map((feature, index) => (
              <div className="feature-card" key={index}> {/* Einzelne Feature-Karte */}
                <img src={feature.image} alt={feature.title} /> {/* Bild des Features */}
                <h3>{feature.title}</h3> {/* Titel des Features */}
                <p>{feature.description}</p> {/* Beschreibung des Features */}
              </div>
          ))}
        </div>
      </section>
  );
}

export default FeaturesSection;
