import React, { useState, useContext } from 'react';
import './Header.css';
import Logo from './Logo';
import NavBar from './NavBar';
import AuthContext from '../../context/AuthContext';

function Header() {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header">
            <div className="header-content">
                <Logo />
                <button className="menu-toggle" onClick={toggleMenu}>
                    &#9776; {/* Hamburger Icon */}
                </button>
                <NavBar menuOpen={menuOpen} isAuthenticated={isAuthenticated} logout={logout} />
            </div>
        </header>
    );
}

export default Header;
