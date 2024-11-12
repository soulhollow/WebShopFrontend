// Importiert React und die benötigten Hooks `useEffect` und `useState`
import React, { useEffect, useState } from 'react';

// Importiert den ApiService, um Daten aus einer externen Quelle abzurufen
import ApiService from '../../context/ApiService.jsx';

// Importiert das CSS-Stylesheet für das spezifische Styling der OverviewSection-Komponente
import './AboutPage.css';

// Definiert die OverviewSection-Komponente, die eine Übersicht über das Unternehmen oder den Inhalt der Seite zeigt
function OverviewSection() {
    // Definiert den Header-State, um den Abschnittstitel zu speichern
    const [header, setHeader] = useState('');
    // Definiert den Text-State, um den Hauptinhaltstext der Übersicht zu speichern
    const [text, setText] = useState('');
    // Definiert den Loading-State, um den Ladezustand anzuzeigen
    const [loading, setLoading] = useState(true);
    // Definiert den Error-State, um mögliche Fehler bei der Datenabfrage zu speichern
    const [error, setError] = useState(null);

    // useEffect-Hook wird einmalig beim Laden der Komponente ausgeführt
    useEffect(() => {
        // Asynchrone Funktion, die die Daten für die Overview-Sektion abruft
        const fetchOverviewData = async () => {
            try {
                // Definiert die Schlüssel für die Daten, die abgerufen werden sollen
                const keys = ['overview_section_header', 'overview_section_text'];

                // Ruft die Inhalte basierend auf den angegebenen Schlüsseln ab
                const responses = await ApiService.getTextContentsByKeys(keys);

                // Erstellt ein Mapping der abgerufenen Inhalte nach Schlüssel
                const contentMap = {};
                responses.forEach(response => {
                    contentMap[response.data.key] = response.data.content;
                });

                // Setzt den Header-Inhalt aus dem abgerufenen Mapping
                setHeader(contentMap['overview_section_header']);
                setText(contentMap['overview_section_text']);
                // Setzt den Ladezustand auf false, sobald die Daten geladen sind
                setLoading(false);
            } catch (err) {
                // Gibt einen Fehler in der Konsole aus und setzt die Fehlermeldung im State
                console.error('Fehler beim Laden der Overview-Daten:', err);
                setError('Es gab ein Problem beim Laden der Daten.');
                setLoading(false);
            }
        };

        // Ruft die fetchOverviewData-Funktion auf, um die Daten zu laden
        fetchOverviewData();
    }, []); // Leeres Array sorgt dafür, dass der Effekt nur einmal beim Laden der Komponente ausgeführt wird

    // Gibt einen Ladehinweis aus, solange die Daten geladen werden
    if (loading) {
        return <p>Loading...</p>;
    }

    // Gibt eine Fehlermeldung aus, falls beim Laden ein Fehler aufgetreten ist
    if (error) {
        return <p>{error}</p>;
    }

    // Rendert die Overview-Sektion, sobald die Daten erfolgreich geladen wurden
    return (
        <section className="overview-section"> {/* Haupt-Container für die Overview-Sektion */}
            <h2>{header}</h2> {/* Header der Sektion */}
            <p>{text}</p> {/* Hauptinhaltstext der Sektion */}
        </section>
    );
}

// Exportiert die OverviewSection-Komponente, sodass sie in anderen Teilen der App verwendet werden kann
export default OverviewSection;
