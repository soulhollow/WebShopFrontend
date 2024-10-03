import React, { useState } from 'react';
import apiServiceInstance from '../../context/ApiService.jsx'; // Stelle sicher, dass du den ApiService korrekt importierst.
import './ContactPage.css';

function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [statusMessage, setStatusMessage] = useState(''); // Status-Meldung für das Ergebnis

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verwende den ApiService, um die Nachricht an das Backend zu senden und zu speichern
    apiServiceInstance.createContactMessage(formData)
      .then(response => {
        // Nachricht anzeigen und Felder leeren
        setStatusMessage('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      })
      .catch(error => {
        console.error('Error:', error);
        setStatusMessage('Failed to send the message. Please try again.');
      });
  };

  return (
    <section className="contact-form-section">
      <h2>Kontaktiere uns</h2>
      {/* Status-Nachricht anzeigen */}
      {statusMessage && <p className="status-message">{statusMessage}</p>}
      
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" placeholder="Dein Name" required value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" placeholder="Deine Email" required value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Betreff:
          <input type="text" name="subject" placeholder="Betreff" value={formData.subject} onChange={handleChange} />
        </label>
        <label>
          Nachricht:
          <textarea name="message" placeholder="Deine Nachricht" required value={formData.message} onChange={handleChange}></textarea>
        </label>
        <button type="submit" className="submit-button">Nachricht senden</button>
      </form>
    </section>
  );
}

export default ContactFormSection;
