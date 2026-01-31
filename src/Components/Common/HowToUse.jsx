import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from '../../nav/Navbar';
import './HowToUse.css';
import { useNavigate } from 'react-router-dom';

const HowToUse = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    // Default to "Guest" or show generic navbar if user is not logged in 
    // (Navbar handles "Guest" or undefined role gracefully by just showing logout/generic links)
    const role = user?.role || "Guest"; 

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleCta = () => {
        if (user) {
            navigate(user.role === 'teacher' ? '/Dashboard' : '/rooms');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="htu-container">
            {/* Show Navbar only if logged in, otherwise could show a simple header or nothing */}
            {user && <Navbar role={role} />}
            
            {/* Spacer to prevent content from hiding behind fixed navbar */}
            {user && <div className="htu-nav-spacer"></div>}

            <section className="htu-hero">
                <h1 className="htu-title">Master Your Mindset</h1>
                <p className="htu-subtitle">
                    Welcome to the future of learning. Mindset combines advanced AI with 
                    intuitive classroom management to supercharge your educational journey.
                </p>
                {!user && (
                    <button className="btn-primary" onClick={handleCta}>
                        Get Started
                    </button>
                )}
            </section>

            <section className="htu-section">
                <h2 className="htu-section-title">Core Features</h2>
                <div className="htu-grid">
                    <div className="htu-card">
                        <div className="htu-card-icon">🧠</div>
                        <h3>AI-Powered RAG</h3>
                        <p>
                            Our Retrieval-Augmented Generation (RAG) agent doesn't just guess. 
                            It reads the exact PDFs and lecture notes uploaded to the room 
                            to give you precise, citation-backed answers.
                        </p>
                        <div className="badge ai">AI Feature</div>
                    </div>

                    <div className="htu-card">
                        <div className="htu-card-icon">📊</div>
                        <h3>Smart Analytics</h3>
                        <p>
                            Teachers can see which topics are confusing students the most. 
                            The system aggregates questions to highlight knowledge gaps automatically.
                        </p>
                        <div className="badge teacher">For Teachers</div>
                    </div>

                    <div className="htu-card">
                        <div className="htu-card-icon">📁</div>
                        <h3>Instant Knowledge Base</h3>
                        <p>
                            Upload course materials once, and they become instantly searchable 
                            and interactive. No more scrolling through hundreds of pages.
                        </p>
                        <div className="badge student">For Everyone</div>
                    </div>
                </div>
            </section>

            <section className="htu-section">
                <h2 className="htu-section-title">How It Works</h2>
                
                <div className="htu-grid">
                    <div className="htu-card">
                        <span className="step-number">1</span>
                        <h3>Create or Join</h3>
                        <p>Teachers create rich learning rooms by uploading material. Students join using a simple code or invite link.</p>
                    </div>
                    
                    <div className="htu-card">
                        <span className="step-number">2</span>
                        <h3>Ask Anything</h3>
                        <p>Type your question in natural language. "What is the definition of mitosis?" or "Explain the main conflict in Chapter 3."</p>
                    </div>

                    <div className="htu-card">
                        <span className="step-number">3</span>
                        <h3>Learn & Adapt</h3>
                        <p>Get instant answers. Teachers monitor the dashboard to see what questions are trending and adjust their lectures accordingly.</p>
                    </div>
                </div>
            </section>

            <div className="htu-cta">
                <h2>Ready to upgrade your learning?</h2>
                <br />
                <button className="btn-primary" onClick={handleCta}>
                    {user ? 'Go to Dashboard' : 'Join Now'}
                </button>
            </div>

        </div>
    );
};

export default HowToUse;
