// Importiert React und die benötigten Hooks `useEffect` und `useState`
import React, { useEffect, useState } from 'react';
// Importiert den ApiService, um Social-Media-Daten aus einer externen Quelle abzurufen
import ApiService from '../../context/ApiService.jsx';
// Importiert das CSS-Stylesheet für das Styling der ContactPage-Komponente
import './ContactPage.css';

// Definiert die SocialMediaSection-Komponente, die Links und Icons für soziale Medien anzeigt
function SocialMediaSection() {
    // Definiert den State für Social-Media-Daten, Ladezustand und Fehlerbehandlung
    const [socialMediaData, setSocialMediaData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect-Hook lädt die Social-Media-Daten beim ersten Rendern
    useEffect(() => {
        const fetchSocialMediaData = async () => {
            try {
                // Definiert die Schlüssel für die Social-Media-Daten
                const keys = [
                    'social_media_header',
                    'social_media_linkedin',
                    'social_media_linkedin_icon',
                    'social_media_twitter',
                    'social_media_twitter_icon',
                    'social_media_facebook',
                    'social_media_facebook_icon'
                ];

                // Ruft die Inhalte basierend auf den angegebenen Schlüsseln ab
                const responses = await ApiService.getTextContentsByKeys(keys);

                // Erstellt ein Mapping der abgerufenen Inhalte nach Schlüssel
                const contentMap = {};
                responses.forEach(response => {
                    contentMap[response.data.key] = response.data.content;
                });

                // Speichert die Social-Media-Daten im State
                setSocialMediaData(contentMap);
                setLoading(false); // Setzt den Ladezustand auf false
            } catch (err) {
                console.error('Fehler beim Laden der Social-Media-Daten:', err); // Fehlerprotokollierung in der Konsole
                setError('Es gab ein Problem beim Laden der Social-Media-Daten.');
                setLoading(false);
            }
        };

        fetchSocialMediaData();
    }, []);

    // Zeigt einen Ladehinweis an, solange die Social-Media-Daten geladen werden
    if (loading) {
        return <p>Loading...</p>;
    }

    // Gibt eine Fehlermeldung aus, falls beim Laden ein Fehler aufgetreten ist
    if (error) {
        return <p>{error}</p>;
    }

    // Rendert die Social-Media-Links und Icons, wenn die Daten erfolgreich geladen wurden
    return (
        <section className="social-media-section"> {/* Haupt-Container für die Social-Media-Sektion */}
            <h2>{socialMediaData['social_media_header']}</h2> {/* Überschrift für die Social-Media-Sektion */}
            <div className="social-media-icons"> {/* Container für die Social-Media-Icons */}
                <a href={socialMediaData['social_media_linkedin']} target="_blank" rel="noopener noreferrer">
                    <img src={socialMediaData['social_media_linkedin_icon']} alt="LinkedIn" /> {/* LinkedIn-Icon */}
                </a>
                <a href={socialMediaData['social_media_twitter']} target="_blank" rel="noopener noreferrer">
                    <img src={socialMediaData['social_media_twitter_icon']} alt="Twitter" /> {/* Twitter-Icon */}
                </a>
                <a href={socialMediaData['social_media_facebook']} target="_blank" rel="noopener noreferrer">
                    <img src={socialMediaData['social_media_facebook_icon']} alt="Facebook" /> {/* Facebook-Icon */}
                </a>
            </div>
        </section>
    );
}

export default SocialMediaSection;
