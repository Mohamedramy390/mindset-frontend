import React, { useState } from "react";
import './navbar.css';
import { Link, useNavigate } from "react-router-dom";

export const Navbar = ({role}) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = (e) => {
        e.preventDefault(); // Prevent default link behavior
        localStorage.removeItem("token"); // Clear the token
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
                {role == "Student" && <Link to={'/rooms'} onClick={() => setIsOpen(false)}>All Rooms</Link>}
                {role == "Student" && <Link to={'/my-rooms'} onClick={() => setIsOpen(false)}>My Rooms</Link>}
                
                {/* Changed Logout to use a click handler */}
                <a href="/login" onClick={handleLogout} className="logout-btn">Logout</a>
            </nav>
        </header>
    );
};