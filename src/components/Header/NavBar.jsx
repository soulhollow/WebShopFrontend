// Importiert React und den Link-Component von `react-router-dom` für die Navigation
import React from 'react';
import { Link } from 'react-router-dom';
// Importiert das CSS-Stylesheet für das Styling der NavBar
import './Header.css';

// Definiert die NavBar-Komponente, die Navigationslinks für die Anwendung anzeigt
function NavBar({ menuOpen, isAuthenticated, logout }) {
    return (
        // Wendet eine CSS-Klasse basierend auf dem `menuOpen`-State an, um das mobile Menü zu öffnen oder zu schließen
        <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
            <ul>
                {/* Hauptnavigation Links */}
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">Über uns</Link></li>
                <li><Link to="/buy">Produkte</Link></li>
                <li><Link to="/contact">Kontakt</Link></li>

                {/* Authentifizierte Links: wird angezeigt, wenn der Benutzer eingeloggt ist */}
                {isAuthenticated ? (
                    <>
                        <li><Link to="/profile">Mein Profil</Link></li>
                        <li><button onClick={logout}>Logout</button></li> {/* Logout-Button */}
                    </>
                ) : (
                    // Nicht authentifizierte Links: Login- und Register-Links, wenn der Benutzer nicht eingeloggt ist
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;
