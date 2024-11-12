// Importiert React und die benötigten Hooks `useEffect` und `useState`
import React, { useEffect, useState } from 'react';
// Importiert den ApiService, um Footer-Daten aus einer externen Quelle abzurufen
import ApiService from '../../context/ApiService.jsx';
// Importiert das CSS-Stylesheet für das Styling der Footer-Komponente
import './Footer.css';

// Definiert die Footer-Komponente, die Navigationslinks, Social-Media-Icons und den unteren Footer-Text anzeigt
function Footer() {
  // Definiert den State für Navigationslinks, Social-Media-Links, Footer-Bottom-Text, Ladezustand und Fehler
  const [footerNavLinks, setFooterNavLinks] = useState([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState({});
  const [footerBottomText, setFooterBottomText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect-Hook lädt die Footer-Daten beim ersten Rendern
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        // Definiert die Schlüssel für die Footer-Daten
        const keys = [
          'footer_nav_home',
          'footer_nav_about',
          'footer_nav_buy',
          'footer_nav_contact',
          'social_media_linkedin',
          'social_media_linkedin_icon',
          'social_media_twitter',
          'social_media_twitter_icon',
          'social_media_facebook',
          'social_media_facebook_icon',
          'footer_bottom_text'
        ];

        // Ruft die Inhalte basierend auf den angegebenen Schlüsseln ab
        const responses = await ApiService.getTextContentsByKeys(keys);

        // Erstellt ein Mapping der abgerufenen Inhalte nach Schlüssel
        const contentMap = {};
        responses.forEach(response => {
          contentMap[response.data.key] = response.data.content;
        });

        // Setzt die Navigationslinks im Footer basierend auf den abgerufenen Daten
        setFooterNavLinks([
          JSON.parse(contentMap['footer_nav_home']),
          JSON.parse(contentMap['footer_nav_about']),
          JSON.parse(contentMap['footer_nav_buy']),
          JSON.parse(contentMap['footer_nav_contact'])
        ]);

        // Setzt die Social-Media-Links und Icons im Footer
        setSocialMediaLinks({
          linkedin: {
            url: contentMap['social_media_linkedin'],
            icon: contentMap['social_media_linkedin_icon']
          },
          twitter: {
            url: contentMap['social_media_twitter'],
            icon: contentMap['social_media_twitter_icon']
          },
          facebook: {
            url: contentMap['social_media_facebook'],
            icon: contentMap['social_media_facebook_icon']
          }
        });

        // Setzt den Text für den unteren Teil des Footers
        setFooterBottomText(contentMap['footer_bottom_text']);
        setLoading(false); // Setzt den Ladezustand auf false
      } catch (err) {
        console.error('Fehler beim Laden der Footer-Daten:', err); // Fehlerprotokollierung in der Konsole
        setError('Es gab ein Problem beim Laden der Footer-Daten.');
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  // Zeigt einen Ladehinweis an, solange die Footer-Daten geladen werden
  if (loading) {
    return <p>Loading...</p>;
  }

  // Gibt eine Fehlermeldung aus, falls beim Laden ein Fehler aufgetreten ist
  if (error) {
    return <p>{error}</p>;
  }

  // Rendert den Footer mit den Navigationslinks, Social-Media-Icons und dem Footer-Bottom-Text
  return (
      <footer className="footer"> {/* Haupt-Container für den Footer */}
        <div className="footer-content"> {/* Container für den Hauptinhalt des Footers */}
          <nav className="footer-nav"> {/* Navigationsbereich im Footer */}
            <ul>
              {footerNavLinks.map((link, index) => (
                  <li key={index}><a href={link.link}>{link.label}</a></li>
                ))}
            </ul>
          </nav>
          <div className="social-media"> {/* Social-Media-Bereich mit Links und Icons */}
            <a href={socialMediaLinks.linkedin.url} target="_blank" rel="noopener noreferrer">
              <img src={socialMediaLinks.linkedin.icon} alt="LinkedIn" /> {/* LinkedIn-Icon */}
            </a>
            <a href={socialMediaLinks.twitter.url} target="_blank" rel="noopener noreferrer">
              <img src={socialMediaLinks.twitter.icon} alt="Twitter" /> {/* Twitter-Icon */}
            </a>
            <a href={socialMediaLinks.facebook.url} target="_blank" rel="noopener noreferrer">
              <img src={socialMediaLinks.facebook.icon} alt="Facebook" /> {/* Facebook-Icon */}
            </a>
          </div>
        </div>
        <div className="footer-bottom"> {/* Bereich für den unteren Text des Footers */}
          <p dangerouslySetInnerHTML={{ __html: footerBottomText }}></p> {/* Footer-Bottom-Text, unterstützt HTML */}
        </div>
      </footer>
  );
}

export default Footer;
