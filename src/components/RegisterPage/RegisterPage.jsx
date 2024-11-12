// Importiert React und die benötigten Hooks `useState`
import React, { useState } from 'react';
// Importiert das CSS-Stylesheet für das Styling der Register-Seite
import './RegisterPage.css';
// Importiert den ApiService für die Registrierung
import ApiService from '../../context/ApiService.jsx';
// Importiert `useNavigate` von `react-router-dom`, um nach der Registrierung zu navigieren
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  // Definiert den State für Name, Email, Passwort, Fehler- und Erfolgsmeldungen
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Initialisiert `useNavigate` zur Navigation nach erfolgreicher Registrierung
  const navigate = useNavigate();

  // Funktion zur Handhabung der Registrierung beim Absenden des Formulars
  const handleRegister = async (e) => {
    e.preventDefault(); // Verhindert das Standard-Formularverhalten (Seiten-Reload)

    try {
      // Erstellt das `userDTO`-Objekt für die Registrierung
      const userDTO = { username: name, email, password };

      // Sendet das `userDTO` an die ApiService-Registrierungsmethode
      await ApiService.register(userDTO);

      // Meldet erfolgreiche Registrierung an den Benutzer
      alert('Registration successful! You can now log in.');
      setError(''); // Löscht eventuelle Fehlermeldungen
      setName(''); // Setzt das Formular zurück
      setEmail('');
      setPassword('');
      navigate('/login'); // Leitet den Benutzer zur Login-Seite weiter

    } catch (error) {
      // Setzt eine Fehlermeldung bei einem API-Fehler oder Netzwerkfehler
      setError(error.response?.data?.message || 'An error occurred during registration.');
      setSuccess(''); // Löscht eventuelle Erfolgsmeldungen
    }
  };

  return (
      <div className="register-page"> {/* Haupt-Container für die Registrierungsseite */}
        <form className="register-form" onSubmit={handleRegister}> {/* Formular für die Registrierung */}
          <h2>Register</h2> {/* Titel für das Registrierungsformular */}

          {/* Zeigt Fehlermeldungen oder Erfolgsmeldungen an */}
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <label>
            Name:
            <input
                type="text"
                value={name} // Wert des Namensfelds
                onChange={(e) => setName(e.target.value)} // Aktualisiert den State bei Eingabe
                required
            />
          </label>

          <label>
            Email:
            <input
                type="email"
                value={email} // Wert des Emailfelds
                onChange={(e) => setEmail(e.target.value)} // Aktualisiert den State bei Eingabe
                required
            />
          </label>

          <label>
            Password:
            <input
                type="password"
                value={password} // Wert des Passwortfelds
                onChange={(e) => setPassword(e.target.value)} // Aktualisiert den State bei Eingabe
                required
            />
          </label>

          <button type="submit" className="register-button">Register</button> {/* Button zum Absenden des Formulars */}
        </form>
      </div>
  );
}

export default RegisterPage;
