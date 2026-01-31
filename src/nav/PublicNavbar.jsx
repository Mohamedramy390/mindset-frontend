import React, { useState } from "react";
import './PublicNavbar.css';
import { Link } from "react-router-dom";

export const PublicNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <header className="public-navbar">
            <h1 className="public-navbar-logo">Mindset</h1>

            {/* Hamburger Icon (Visible only on mobile) */}
            <div className={`public-hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            {/* Menu Links */}
            <nav className={`public-navbar-menu ${isOpen ? "active" : ""}`}>
                <Link to="/how-to-use" onClick={closeMenu}>How to Use</Link>
                <Link to="/login" className="btn-login" onClick={closeMenu}>Login</Link>
                <Link to="/" className="btn-signup" onClick={closeMenu}>Sign Up</Link>
            </nav>
        </header>
    );
};
