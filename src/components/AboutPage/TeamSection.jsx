// Importiert React und die benötigten Hooks `useEffect` und `useState`
import React, { useEffect, useState } from 'react';

// Importiert den ApiService, um Daten aus einer externen Quelle abzurufen
import ApiService from '../../context/ApiService.jsx';

// Importiert das CSS-Stylesheet für das spezifische Styling der TeamSection-Komponente
import './AboutPage.css';

// Importiert das Teambild, das in der Teamsektion angezeigt wird
import Teambild from "./Teambild.jpg";

// Definiert die TeamSection-Komponente, die Informationen über das Team des Unternehmens zeigt
function TeamSection() {
  // Definiert den Header-State, um den Titel der Teamsektion zu speichern
  const [header, setHeader] = useState('');
  // Definiert den teamMembers-State, um die Informationen über die Teammitglieder zu speichern
  const [teamMembers, setTeamMembers] = useState([]);
  // Definiert den Loading-State, um den Ladezustand anzuzeigen
  const [loading, setLoading] = useState(true);
  // Definiert den Error-State, um mögliche Fehler bei der Datenabfrage zu speichern
  const [error, setError] = useState(null);

  // useEffect-Hook wird einmalig beim Laden der Komponente ausgeführt
  useEffect(() => {
    // Asynchrone Funktion, die die Daten für die Teamsektion abruft
    const fetchTeamData = async () => {
      try {
        // Definiert die Schlüssel für die Daten, die abgerufen werden sollen
        const keys = [
          'team_section_header',
          'team_member_1',
          'team_member_2',
          'team_member_3',
          'team_member_4'
        ];

        // Ruft die Inhalte basierend auf den angegebenen Schlüsseln ab
        const responses = await ApiService.getTextContentsByKeys(keys);

        // Erstellt ein Mapping der abgerufenen Inhalte nach Schlüssel
        const contentMap = {};
        responses.forEach(response => {
          contentMap[response.data.key] = response.data.content;
        });

        // Setzt den Header-Inhalt aus dem abgerufenen Mapping
        setHeader(contentMap['team_section_header']);

        // Formatiert die Teammitglieder-Daten und konvertiert sie in ein Array, das angezeigt werden kann
        const formattedTeamMembers = keys
            .filter(key => key !== 'team_section_header') // Filtert den Header aus den Teammitgliedern heraus
            .map(key => JSON.parse(contentMap[key])); // Parst jeden Teammitglied-Datensatz und fügt ihn dem Array hinzu

        // Aktualisiert den State mit den formatierten Teammitgliedern
        setTeamMembers(formattedTeamMembers);
        // Setzt den Ladezustand auf false, sobald die Daten geladen sind
        setLoading(false);
      } catch (err) {
        // Gibt einen Fehler in der Konsole aus und setzt die Fehlermeldung im State
        console.error('Fehler beim Laden der Team-Daten:', err);
        setError('Es gab ein Problem beim Laden der Team-Daten.');
        setLoading(false);
      }
    };

    // Ruft die fetchTeamData-Funktion auf, um die Daten zu laden
    fetchTeamData();
  }, []); // Leeres Array sorgt dafür, dass der Effekt nur einmal beim Laden der Komponente ausgeführt wird

  // Gibt einen Ladehinweis aus, solange die Daten geladen werden
  if (loading) {
    return <p>Loading...</p>;
  }

  // Gibt eine Fehlermeldung aus, falls beim Laden ein Fehler aufgetreten ist
  if (error) {
    return <p>{error}</p>;
  }

  // Rendert die Team-Sektion, sobald die Daten erfolgreich geladen wurden
  return (
      <section className="team-section"> {/* Haupt-Container für die Teamsektion */}
        <h2>{header}</h2> {/* Header der Sektion */}
        <div className="team-grid"> {/* Grid-Layout für die Teammitglieder */}
          {teamMembers.map((member, index) => (
              <div className="team-member" key={index}> {/* Einzelner Container für ein Teammitglied */}
                <h3>{member.name}</h3> {/* Name des Teammitglieds */}
                <p>{member.title}</p> {/* Position/Titel des Teammitglieds */}
                <p>{member.description}</p> {/* Beschreibung des Teammitglieds */}
              </div>
          ))}
          <div className='team-img'> {/* Container für das Team-Bild */}
            <img src={Teambild} alt="Team Bild" /> {/* Team-Bild */}
          </div>
        </div>
      </section>
  );
}

// Exportiert die TeamSection-Komponente, sodass sie in anderen Teilen der App verwendet werden kann
export default TeamSection;
