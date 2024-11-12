// Importiert React, die benötigten Hooks `useState` und `useContext`
import React, { useState, useContext } from 'react';
// Importiert das CSS-Stylesheet für das Styling der LoginPage
import './LoginPage.css';
// Importiert den ApiService, um die Login-Funktionalität zu unterstützen
import ApiService from '../../context/ApiService.jsx';
// Importiert `useNavigate` für die Navigation nach erfolgreichem Login
import { useNavigate } from 'react-router-dom';
// Importiert den AuthContext, um die `login`-Funktion zu verwenden
import AuthContext from '../../context/AuthContext';

function LoginPage() {
  // Definiert den State für Benutzernamen, Passwort und Fehlernachrichten
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Extrahiert die `login`-Funktion aus dem AuthContext
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Definiert die `handleLogin`-Funktion, die beim Absenden des Formulars aufgerufen wird
  const handleLogin = async (e) => {
    e.preventDefault(); // Verhindert das Standard-Formularverhalten (Seiten-Reload)

    try {
      // Erstellt das Login-Anfrageobjekt
      const loginRequest = { username, password };

      // Sendet die Login-Anfrage und erhält das Token als Antwort
      const response = await ApiService.login(loginRequest);
      const token = response.data.token;

      // Speichert das Token im AuthContext und navigiert zur Profilseite
      login(token);
      navigate('/profile');
    } catch (err) {
      // Fehlerbehandlung: Setzt eine Fehlermeldung im State, um sie anzuzeigen
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'An error occurred during login. Please check your credentials.');
    }
  };

  return (
      <div className="login-page"> {/* Haupt-Container für die Login-Seite */}
        <form className="login-form" onSubmit={handleLogin}> {/* Formular, das die handleLogin-Funktion aufruft */}
          <h2>Login</h2>

          {/* Fehlernachricht anzeigen, falls ein Fehler im State gesetzt ist */}
          {error && <p className="error-message">{error}</p>}

          <label>
            Username:
            <input
                type="text"
                value={username} // Wert des Benutzernamensfelds
                onChange={(e) => setUsername(e.target.value)} // Aktualisiert den State bei Eingabe
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

          <button type="submit" className="login-button">Login</button> {/* Absenden-Button */}
        </form>
      </div>
  );
}

export default LoginPage;
