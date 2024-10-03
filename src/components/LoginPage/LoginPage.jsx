import React, { useState, useContext } from 'react';
import './LoginPage.css';
import ApiService from '../../context/ApiService.jsx';  // Importiere den ApiService
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';  // Importiere AuthContext

function LoginPage() {
  const [username, setUsername] = useState('');  // Klare Benennung des Benutzernamens
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);  // Setze den initialen Error-Wert auf null, um Fehler klarer darzustellen

  const { login } = useContext(AuthContext);  // Hole die login-Funktion aus dem AuthContext
  const navigate = useNavigate();

  // Definiere die handleLogin-Funktion
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginRequest = { username, password };  // Erstelle loginRequest mit klaren Variablen-Namen
      const response = await ApiService.login(loginRequest);  // Rufe die ApiService login-Methode auf
      const token = response.data.token;

      login(token);  // Rufe die login-Funktion aus dem AuthContext auf
      navigate('/profile');  // Navigiere zur Profilseite

    } catch (err) {
      // Verbesserte Fehlerbehandlung mit klareren Meldungen
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'An error occurred during login. Please check your credentials.');
    }
  };

  return (
      <div className="login-page">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}  {/* Fehlernachricht anzeigen */}
          <label>
            Username:
            <input
                type="text"
                value={username}  // Verwende die klar benannte username-Variable
                onChange={(e) => setUsername(e.target.value)}
                required
            />
          </label>
          <label>
            Password:
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
          </label>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
  );
}

export default LoginPage;
