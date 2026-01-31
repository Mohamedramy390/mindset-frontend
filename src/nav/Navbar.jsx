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
            {role === "student" && <Link to={'/rooms'} className="room-logo">Student Dashboard</Link>}
            {role === "teacher" && <Link to={'/dashboard'} className="room-logo">Teacher Dashboard</Link>}

            {/* Hamburger Icon (Visible only on mobile) */}
            <div className="hamburger" onClick={toggleMenu}>
                <span className={isOpen ? "bar active" : "bar"}></span>
                <span className={isOpen ? "bar active" : "bar"}></span>
                <span className={isOpen ? "bar active" : "bar"}></span>
            </div>

            {/* Menu Links */}
            <nav className={`room-menu ${isOpen ? "active" : ""}`}>
                {role === "student" && <Link to={'/rooms'} onClick={() => setIsOpen(false)}>All Rooms</Link>}
                {role === "student" && <Link to={'/my-rooms'} onClick={() => setIsOpen(false)}>My Rooms</Link>}
                <Link to={'/how-to-use'} onClick={() => setIsOpen(false)}>How to Use</Link>
                <Link to={'/feedback'} onClick={() => setIsOpen(false)}>Feedback</Link>
                
                {/* Changed Logout to use a click handler */}
                <a href="/login" onClick={handleLogout} className="logout-btn">Logout</a>
            </nav>
        </header>
    );
};