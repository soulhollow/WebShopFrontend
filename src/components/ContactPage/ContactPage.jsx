// Importiert React, um die UI-Komponente zu erstellen
import React from 'react';
// Importiert das CSS-Stylesheet für das spezifische Styling der ContactPage-Komponente
import './ContactPage.css';

// Importiert die Unterkomponenten, die in der Kontaktseite verwendet werden
import ContactFormSection from './ContactFormSection';
import LocationInfoSection from './LocationInfoSection';
import SocialMediaSection from './SocialMediaSection';
import FAQSection from './FAQSection';

// Definiert die ContactPage-Komponente, die die Hauptseite für den Kontaktbereich darstellt
function ContactPage() {
    return (
        <div className="contact-page"> {/* Haupt-Container für die Kontaktseite */}
            <ContactFormSection /> {/* Abschnitt für das Kontaktformular */}
            <LocationInfoSection /> {/* Abschnitt mit Standortinformationen */}
            <SocialMediaSection /> {/* Abschnitt mit Links zu den sozialen Medien */}
            <FAQSection /> {/* Abschnitt mit häufig gestellten Fragen */}
        </div>
    );
}

// Exportiert die ContactPage-Komponente, sodass sie in anderen Teilen der App verwendet werden kann
export default ContactPage;
