// Importiert React und die benötigten Hooks `useEffect` und `useState`
import React, { useEffect, useState } from 'react';
// Importiert den ApiService für die Kommunikation mit dem Backend, um Standortdaten zu laden
import ApiService from '../../context/ApiService.jsx';
// Importiert das CSS-Stylesheet für das Styling der ContactPage-Komponente
import './ContactPage.css';

// Definiert die LocationInfoSection-Komponente, die Standortinformationen und eine Karte anzeigt
function LocationInfoSection() {
    // Definiert den State für Standortdaten, Ladezustand und Fehlerbehandlung
    const [locationData, setLocationData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect-Hook lädt die Standortdaten beim ersten Rendern
    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                // Definiert die Schlüssel für die Standortdaten
                const keys = ['kontakt_adresse', 'kontakt_telefon', 'kontakt_email', 'map_embed_src'];
                // Ruft die Inhalte basierend auf den angegebenen Schlüsseln ab
                const responses = await ApiService.getTextContentsByKeys(keys);

                // Erstellt ein Mapping der abgerufenen Inhalte nach Schlüssel
                const contentMap = {};
                responses.forEach(response => {
                    contentMap[response.data.key] = response.data.content;
                });

                // Speichert die Standortdaten im State
                setLocationData(contentMap);
                setLoading(false); // Setzt den Ladezustand auf false
            } catch (err) {
                console.error('Fehler beim Laden der Standortdaten:', err); // Fehlerprotokollierung in der Konsole
                setError('Es gab ein Problem beim Laden der Standortdaten.');
                setLoading(false);
            }
        };

        fetchLocationData();
    }, []);

    // Zeigt einen Ladehinweis an, solange die Standortdaten geladen werden
    if (loading) {
        return <p>Loading...</p>;
    }

    // Gibt eine Fehlermeldung aus, falls beim Laden ein Fehler aufgetreten ist
    if (error) {
        return <p>{error}</p>;
    }

    // Rendert die Standortinformationen und die eingebettete Karte
    return (
        <section className="location-info-section"> {/* Haupt-Container für die Standortinformation */}
            <h2>Unser Standort</h2> {/* Überschrift für den Standort */}
            <div className="address-block"> {/* Container für die Adressinformationen */}
                <p>{locationData['kontakt_adresse']}</p> {/* Adresse */}
                <p>Phone: {locationData['kontakt_telefon']}</p> {/* Telefonnummer */}
                <p>Email: {locationData['kontakt_email']}</p> {/* E-Mail-Adresse */}
            </div>
            <div className="map-embed"> {/* Container für die eingebettete Karte */}
                <iframe
                    src={locationData['map_embed_src']} // URL für die Karte
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Our Location"
                ></iframe>
            </div>
        </section>
    );
}

export default LocationInfoSection;
