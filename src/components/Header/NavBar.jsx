import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function NavBar({ menuOpen, isAuthenticated, logout }) {
    return (
        <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/buy">Buy</Link></li>
                <li><Link to="/contact">Contact</Link></li>

                {/* Authentifizierte oder nicht authentifizierte Links */}
                {isAuthenticated ? (
                    <>
                        <li><Link to="/profile">My Profile</Link></li>
                        <li><button onClick={logout}>Logout</button></li>
                    </>
                ) : (
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
