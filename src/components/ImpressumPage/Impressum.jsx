// Importiert React und die benötigten Hooks `useEffect` und `useState`
import React, { useEffect, useState } from 'react';
// Importiert den ApiService, um Impressum-Daten aus einer externen Quelle abzurufen
import ApiService from '../../context/ApiService.jsx';
// Importiert das CSS-Stylesheet für das Styling der Impressum-Seite
import './Impressum.css';

// Definiert die Impressum-Komponente, die die Impressumsinformationen der Website anzeigt
function Impressum() {
    // Definiert den State für Impressum-Daten, Ladezustand und Fehlerbehandlung
    const [impressumData, setImpressumData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect-Hook lädt die Impressum-Daten beim ersten Rendern
    useEffect(() => {
        const fetchImpressumData = async () => {
            try {
                // Definiert die Schlüssel für die Impressum-Daten
                const keys = [
                    'impressum_header',
                    'impressum_responsible',
                    'impressum_representative',
                    'impressum_contact',
                    'impressum_vat_id',
                    'impressum_content_liability',
                    'impressum_links_liability',
                    'impressum_privacy'
                ];

                // Ruft die Inhalte basierend auf den angegebenen Schlüsseln ab
                const responses = await ApiService.getTextContentsByKeys(keys);

                // Erstellt ein Mapping der abgerufenen Inhalte nach Schlüssel
                const contentMap = {};
                responses.forEach(response => {
                    contentMap[response.data.key] = response.data.content;
                });

                // Speichert die Impressum-Daten im State
                setImpressumData(contentMap);
                setLoading(false); // Setzt den Ladezustand auf false
            } catch (err) {
                console.error('Fehler beim Laden der Impressum-Daten:', err); // Fehlerprotokollierung in der Konsole
                setError('Es gab ein Problem beim Laden der Impressum-Daten.');
                setLoading(false);
            }
        };

        fetchImpressumData();
    }, []);

    // Zeigt einen Ladehinweis an, solange die Impressum-Daten geladen werden
    if (loading) {
        return <p>Loading...</p>;
    }

    // Gibt eine Fehlermeldung aus, falls beim Laden ein Fehler aufgetreten ist
    if (error) {
        return <p>{error}</p>;
    }

    // Rendert die Impressum-Daten, wenn sie erfolgreich geladen wurden
    return (
        <div className="impressum"> {/* Haupt-Container für die Impressum-Seite */}
            <h2>{impressumData['impressum_header']}</h2> {/* Header des Impressums */}
            <p dangerouslySetInnerHTML={{ __html: impressumData['impressum_responsible'] }}></p> {/* Verantwortliche Person */}
            <p dangerouslySetInnerHTML={{ __html: impressumData['impressum_representative'] }}></p> {/* Gesetzlicher Vertreter */}
            <p dangerouslySetInnerHTML={{ __html: impressumData['impressum_contact'] }}></p> {/* Kontaktinformationen */}
            <p dangerouslySetInnerHTML={{ __html: impressumData['impressum_vat_id'] }}></p> {/* USt-IdNr. */}
            <p dangerouslySetInnerHTML={{ __html: impressumData['impressum_content_liability'] }}></p> {/* Haftung für Inhalte */}
            <p dangerouslySetInnerHTML={{ __html: impressumData['impressum_links_liability'] }}></p> {/* Haftung für Links */}
            <p dangerouslySetInnerHTML={{ __html: impressumData['impressum_privacy'] }}></p> {/* Datenschutzinformationen */}
        </div>
    );
}

export default Impressum;
