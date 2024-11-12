// Importiert React und die benötigten Hooks `createContext`, `useState`, und `useEffect`
import React, { createContext, useState, useEffect } from 'react';

// Erstellt den Authentifizierungs-Kontext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Definiert den State `isAuthenticated`, um den Authentifizierungsstatus des Benutzers zu verwalten
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect-Hook überprüft beim Laden der Komponente, ob ein Token im localStorage vorhanden ist
  useEffect(() => {
    const token = localStorage.getItem('token'); // Ruft das Token aus dem localStorage ab
    console.log('Initialer Token aus localStorage:', token);

    if (token) {
      setIsAuthenticated(true); // Setzt den Authentifizierungsstatus auf `true`, wenn ein Token vorhanden ist
    } else {
      setIsAuthenticated(false); // Setzt den Authentifizierungsstatus auf `false`, wenn kein Token vorhanden ist
    }
  }, []);

  // Funktion `login`, die beim Einloggen des Benutzers aufgerufen wird
  const login = (token) => {
    console.log('Login mit Token:', token);
    localStorage.setItem('token', token); // Speichert das Token im localStorage
    setIsAuthenticated(true); // Setzt den Authentifizierungsstatus auf `true`
  };

  // Funktion `logout`, die beim Ausloggen des Benutzers aufgerufen wird
  const logout = () => {
    console.log('Logout');
    localStorage.removeItem('token'); // Entfernt das Token aus dem localStorage
    setIsAuthenticated(false); // Setzt den Authentifizierungsstatus auf `false`
  };

  // Stellt den Authentifizierungsstatus, die Login- und Logout-Funktionen im Kontext zur Verfügung
  return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
};

export default AuthContext;
