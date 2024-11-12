// Importiert React und die benötigten Hooks `useEffect` und `useState`
import React, { useEffect, useState } from 'react';
// Importiert den ApiService, um die Datenschutz-Daten aus einer externen Quelle abzurufen
import ApiService from '../../context/ApiService.jsx';
// Importiert das CSS-Stylesheet für das Styling der Datenschutz-Seite
import './Datenschutz.css';

// Definiert die Datenschutz-Komponente, die die Datenschutzerklärung anzeigt
function Datenschutz() {
    // Definiert den State für die Datenschutz-Daten, Ladezustand und Fehlerbehandlung
    const [datenschutzData, setDatenschutzData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect-Hook lädt die Datenschutz-Daten beim ersten Rendern
    useEffect(() => {
        const fetchDatenschutzData = async () => {
            try {
                // Definiert die Schlüssel für die Datenschutz-Daten
                const keys = ['datenschutz_header', 'datenschutz_text'];

                // Ruft die Inhalte basierend auf den angegebenen Schlüsseln ab
                const responses = await ApiService.getTextContentsByKeys(keys);

                // Erstellt ein Mapping der abgerufenen Inhalte nach Schlüssel
                const contentMap = {};
                responses.forEach(response => {
                    contentMap[response.data.key] = response.data.content;
                });

                // Speichert die Datenschutz-Daten im State
                setDatenschutzData(contentMap);
                setLoading(false); // Setzt den Ladezustand auf false
            } catch (err) {
                console.error('Fehler beim Laden der Datenschutz-Daten:', err); // Fehlerprotokollierung in der Konsole
                setError('Es gab ein Problem beim Laden der Datenschutz-Daten.');
                setLoading(false);
            }
        };

        fetchDatenschutzData();
    }, []);

    // Zeigt einen Ladehinweis an, solange die Datenschutz-Daten geladen werden
    if (loading) {
        return <p>Loading...</p>;
    }

    // Gibt eine Fehlermeldung aus, falls beim Laden ein Fehler aufgetreten ist
    if (error) {
        return <p>{error}</p>;
    }

    // Rendert die Datenschutz-Daten, wenn sie erfolgreich geladen wurden
    return (
        <div className="datenschutz"> {/* Haupt-Container für die Datenschutz-Seite */}
            <h2>{datenschutzData['datenschutz_header']}</h2> {/* Header für die Datenschutzerklärung */}
            <p>{datenschutzData['datenschutz_text']}</p> {/* Text der Datenschutzerklärung */}
        </div>
    );
}

export default Datenschutz;
