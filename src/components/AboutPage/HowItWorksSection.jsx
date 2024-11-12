// Importiert React und die benötigten Hooks `useEffect` und `useState`
import React, { useEffect, useState } from 'react';

// Importiert den ApiService, um Daten aus einer externen Quelle abzurufen
import ApiService from '../../context/ApiService.jsx';

// Importiert das CSS-Stylesheet für das spezifische Styling der "How It Works"-Sektion
import './AboutPage.css';

// Definiert die HowItWorksSection-Komponente, die zeigt, wie das Unternehmen funktioniert
function HowItWorksSection() {
  // Definiert den Header-State, um den Abschnittstitel zu speichern
  const [header, setHeader] = useState('');
  // Definiert den Steps-State, um die Schritte, die erklärt werden sollen, zu speichern
  const [steps, setSteps] = useState([]);
  // Definiert den Loading-State, um den Ladezustand anzuzeigen
  const [loading, setLoading] = useState(true);
  // Definiert den Error-State, um mögliche Fehler bei der Datenabfrage zu speichern
  const [error, setError] = useState(null);

  // useEffect-Hook wird einmalig beim Laden der Komponente ausgeführt
  useEffect(() => {
    // Asynchrone Funktion, die die Daten für die "How It Works"-Sektion abruft
    const fetchHowItWorksData = async () => {
      try {
        // Definiert die Schlüssel für die Daten, die abgerufen werden sollen
        const keys = [
          'how_it_works_header',
          'how_it_works_step_1',
          'how_it_works_step_2',
          'how_it_works_step_3'
        ];

        // Ruft die Inhalte basierend auf den angegebenen Schlüsseln ab
        const responses = await ApiService.getTextContentsByKeys(keys);

        // Erstellt ein Mapping der abgerufenen Inhalte nach Schlüssel
        const contentMap = {};
        responses.forEach(response => {
          contentMap[response.data.key] = response.data.content;
        });

        // Setzt den Header-Inhalt aus dem abgerufenen Mapping
        setHeader(contentMap['how_it_works_header']);

        // Formatiert die Schritte und konvertiert sie in ein Array, das angezeigt werden kann
        const formattedSteps = keys
            .filter(key => key !== 'how_it_works_header') // Filtert den Header aus den Schritten heraus
            .map(key => JSON.parse(contentMap[key])); // Parst jeden Schritt und fügt ihn dem Array hinzu

        // Aktualisiert den State mit den formatierten Schritten
        setSteps(formattedSteps);
        // Setzt den Ladezustand auf false, sobald die Daten geladen sind
        setLoading(false);
      } catch (err) {
        // Gibt einen Fehler in der Konsole aus und setzt die Fehlermeldung im State
        console.error('Fehler beim Laden der "Wie es funktioniert"-Daten:', err);
        setError('Es gab ein Problem beim Laden der Daten.');
        setLoading(false);
      }
    };

    // Ruft die fetchHowItWorksData-Funktion auf, um die Daten zu laden
    fetchHowItWorksData();
  }, []); // Leeres Array sorgt dafür, dass der Effekt nur einmal beim Laden der Komponente ausgeführt wird

  // Gibt einen Ladehinweis aus, solange die Daten geladen werden
  if (loading) {
    return <p>Loading...</p>;
  }

  // Gibt eine Fehlermeldung aus, falls beim Laden ein Fehler aufgetreten ist
  if (error) {
    return <p>{error}</p>;
  }

  // Rendert die "How It Works"-Sektion, sobald die Daten erfolgreich geladen wurden
  return (
      <section className="how-it-works-section"> {/* Haupt-Container für die "How It Works"-Sektion */}
        <h2>{header}</h2> {/* Header der Sektion */}
        <div className="steps"> {/* Container für die Schritte */}
          {steps.map((step, index) => (
              <div className="step" key={index}> {/* Einzelner Schritt */}
                <h3>{step.title}</h3> {/* Titel des Schritts */}
                <p>{step.description}</p> {/* Beschreibung des Schritts */}
              </div>
          ))}
        </div>
      </section>
  );
}

// Exportiert die HowItWorksSection-Komponente, sodass sie in anderen Teilen der App verwendet werden kann
export default HowItWorksSection;
