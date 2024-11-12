// Importiert React und die benötigten Hooks `useContext` und `useEffect`
import React, { useContext } from 'react';
// Importiert `Navigate` von `react-router-dom`, um den Benutzer umzuleiten, falls nicht authentifiziert
import { Navigate } from 'react-router-dom';
// Importiert den Authentifizierungs-Kontext, um den Login-Status zu prüfen
import AuthContext from '../../context/AuthContext';

function ProtectedRoute({ children }) {
  // Ermittelt den Authentifizierungsstatus aus dem AuthContext
  const { isAuthenticated } = useContext(AuthContext);

  // Protokolliert den Authentifizierungsstatus für Debugging-Zwecke
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);

  // Wenn der Benutzer authentifiziert ist, werden die geschützten Kinderkomponenten angezeigt,
  // andernfalls erfolgt eine Umleitung zur Login-Seite
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
