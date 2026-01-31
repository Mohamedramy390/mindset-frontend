import React, { useState } from "react";
import './navbar.css';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = ({role}) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = (e) => {
        e.preventDefault(); // Prevent default link behavior
        logout(); // Use AuthContext logout to clear user state
        navigate("/login"); // Go to login
    };

    return (
        <header className="room-navbar">
            <h1 className="room-logo">{role} Dashboard</h1>

            {/* Hamburger Icon (Visible only on mobile) */}
            <div className="hamburger" onClick={toggleMenu}>
                <span className={isOpen ? "bar active" : "bar"}></span>
                <span className={isOpen ? "bar active" : "bar"}></span>
                <span className={isOpen ? "bar active" : "bar"}></span>
            </div>

            {/* Menu Links */}
            <nav className={`room-menu ${isOpen ? "active" : ""}`}>
                {role === "Student" && <Link to={'/rooms'} onClick={() => setIsOpen(false)}>All Rooms</Link>}
                {role === "Student" && <Link to={'/my-rooms'} onClick={() => setIsOpen(false)}>My Rooms</Link>}
                <Link to={'/how-to-use'} onClick={() => setIsOpen(false)}>How to Use</Link>
                
                {/* Changed Logout to use a click handler */}
                <a href="/login" onClick={handleLogout} className="logout-btn">Logout</a>
            </nav>
        </header>
    );
};