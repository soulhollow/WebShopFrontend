// Importiert React und die benötigten Hooks `useEffect` und `useState`
import React, { useEffect, useState } from 'react';
// Importiert Link für die Navigation und ApiService für die Bestätigungsdaten
import { Link } from 'react-router-dom';
import ApiService from '../../context/ApiService.jsx';
// Importiert das CSS-Stylesheet für das Styling der OrderConfirmationPage
import './OrderConfirmationPage.css';

function OrderConfirmationPage() {
    // Definiert den State für Header, Nachricht, Linktext, Ladezustand und Fehler
    const [header, setHeader] = useState('');
    const [message, setMessage] = useState('');
    const [linkText, setLinkText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect-Hook lädt die Bestätigungsdaten beim ersten Rendern
    useEffect(() => {
        const fetchConfirmationData = async () => {
            try {
                // Definiert die Schlüssel für die Bestätigungsdaten
                const keys = [
                    'order_confirmation_header',
                    'order_confirmation_message',
                    'order_confirmation_link_text'
                ];

                // Ruft die Inhalte basierend auf den angegebenen Schlüsseln ab
                const responses = await ApiService.getTextContentsByKeys(keys);

                // Erstellt ein Mapping der abgerufenen Inhalte nach Schlüssel
                const contentMap = {};
                responses.forEach(response => {
                    contentMap[response.data.key] = response.data.content;
                });

                // Setzt die Inhalte für Header, Nachricht und Linktext
                setHeader(contentMap['order_confirmation_header']);
                setMessage(contentMap['order_confirmation_message']);
                setLinkText(contentMap['order_confirmation_link_text']);
                setLoading(false); // Setzt den Ladezustand auf false
            } catch (err) {
                console.error('Fehler beim Laden der Bestätigungsdaten:', err); // Fehlerprotokollierung in der Konsole
                setError('Es gab ein Problem beim Laden der Bestätigungsdaten.');
                setLoading(false);
            }
        };

        fetchConfirmationData();
    }, []);

    // Zeigt einen Ladehinweis an, solange die Bestätigungsdaten geladen werden
    if (loading) {
        return <p>Loading...</p>;
    }

    // Gibt eine Fehlermeldung aus, falls beim Laden ein Fehler aufgetreten ist
    if (error) {
        return <p>{error}</p>;
    }

    // Rendert die Bestätigungsdaten, wenn sie erfolgreich geladen wurden
    return (
        <div className="order-confirmation-page"> {/* Haupt-Container für die Bestätigungsseite */}
            <div className="confirmation-box"> {/* Box für die Bestätigungsnachricht */}
                <div className="confirmation-icon">✔️</div> {/* Check-Icon als visuelle Bestätigung */}
                <h1>{header}</h1> {/* Header der Bestätigungsnachricht */}
                <p>{message}</p> {/* Bestätigungsnachricht */}
                <Link to="/" className="home-link">{linkText}</Link> {/* Link zur Homepage */}
            </div>
        </div>
    );
}

export default OrderConfirmationPage;
