// Importiert React, die `useState` und `useContext` Hooks
import React, { useState, useContext } from 'react';
// Importiert das CSS-Stylesheet für das Styling der Header-Komponente
import './Header.css';
// Importiert die Logo-Komponente für die Anzeige des Logos im Header
import Logo from './Logo';
// Importiert die NavBar-Komponente für die Navigation im Header
import NavBar from './NavBar';
// Importiert den AuthContext, um den Authentifizierungsstatus zu verwenden
import AuthContext from '../../context/AuthContext';

function Header() {
    // Destrukturiert den Authentifizierungsstatus und die Logout-Funktion aus dem AuthContext
    const { isAuthenticated, logout } = useContext(AuthContext);
    // Definiert den State `menuOpen`, um die Sichtbarkeit des Menüs auf mobilen Geräten zu steuern
    const [menuOpen, setMenuOpen] = useState(false);

    // Funktion zum Umschalten des Menüs (öffnen/schließen)
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Rendert den Header-Bereich mit Logo, Menü-Toggle und Navigation
    return (
        <header className="header"> {/* Haupt-Container für den Header */}
            <div className="header-content"> {/* Container für den Inhalt des Headers */}
                <Logo /> {/* Logo-Komponente */}
                <button className="menu-toggle" onClick={toggleMenu}> {/* Button für das Hamburger-Menü-Icon */}
                    &#9776; {/* Hamburger Icon */}
                </button>
                <NavBar
                    menuOpen={menuOpen}  // Überträgt den Status des Menüs an die NavBar-Komponente
                    isAuthenticated={isAuthenticated}  // Authentifizierungsstatus für die Navigation
                    logout={logout}  // Logout-Funktion für die Navigation
                />
            </div>
        </header>
    );
}

export default Header;
