// Importiert React und den `useState`-Hook
import React, { useState } from 'react';
// Importiert den ApiService für die Kommunikation mit dem Backend
import apiServiceInstance from '../../context/ApiService.jsx'; // Stelle sicher, dass du den ApiService korrekt importierst
// Importiert das CSS-Stylesheet für das Styling der ContactPage-Komponente
import './ContactPage.css';

function ContactFormSection() {
  // Definiert den formData-State, um die Daten aus dem Kontaktformular zu speichern
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Definiert den statusMessage-State, um eine Statusmeldung anzuzeigen (z. B. Erfolg oder Fehler)
  const [statusMessage, setStatusMessage] = useState('');

  // Handler-Funktion für Änderungen in den Eingabefeldern
  const handleChange = (e) => {
    // Aktualisiert das entsprechende Feld im formData-Objekt basierend auf dem Namen des Eingabefeldes
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler-Funktion für das Absenden des Formulars
  const handleSubmit = (e) => {
    e.preventDefault(); // Verhindert das Standard-Seiten-Reload-Verhalten

    // Sendet die Nachricht über den ApiService an das Backend
    apiServiceInstance.createContactMessage(formData)
        .then(response => {
          // Erfolgsmeldung anzeigen und die Formularfelder leeren
          setStatusMessage('Message sent successfully!');
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
        })
        .catch(error => {
          console.error('Error:', error); // Fehlerprotokollierung in der Konsole
          setStatusMessage('Failed to send the message. Please try again.');
        });
  };

  return (
      <section className="contact-form-section"> {/* Haupt-Container für das Kontaktformular */}
        <h2>Kontaktiere uns</h2> {/* Überschrift für das Kontaktformular */}

        {/* Statusnachricht anzeigen, wenn sie gesetzt ist */}
        {statusMessage && <p className="status-message">{statusMessage}</p>}

        <form className="contact-form" onSubmit={handleSubmit}> {/* Formular, das den Submit-Handler aufruft */}
          <label>
            Name:
            <input
                type="text"
                name="name"
                placeholder="Dein Name"
                required
                value={formData.name}
                onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
                type="email"
                name="email"
                placeholder="Deine Email"
                required
                value={formData.email}
                onChange={handleChange}
            />
          </label>
          <label>
            Betreff:
            <input
                type="text"
                name="subject"
                placeholder="Betreff"
                value={formData.subject}
                onChange={handleChange}
            />
          </label>
          <label>
            Nachricht:
            <textarea
                name="message"
                placeholder="Deine Nachricht"
                required
                value={formData.message}
                onChange={handleChange}
            ></textarea>
          </label>
          <button type="submit" className="submit-button">Nachricht senden</button> {/* Senden-Button */}
        </form>
      </section>
  );
}

export default ContactFormSection;
