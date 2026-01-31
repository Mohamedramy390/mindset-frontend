import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from '../../nav/Navbar';
import { PublicNavbar } from '../../nav/PublicNavbar';
import './Feedback.css';

const Feedback = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'complaint',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // Pre-fill user data if logged in
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                email: user.email || ''
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            // Replace this URL with your Google Apps Script Web App URL
            const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzyavVYdoDlRhaOcKhQnUTM9opO3PocTlqb1xYG9zVP2k2rxA6SGUFNhBpl_b2YdRPm/exec';
            
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Important for Google Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    timestamp: new Date().toISOString(),
                    userRole: user?.role || 'Guest'
                })
            });

            // Since mode is 'no-cors', we can't read the response
            // Assume success if no error is thrown
            setSuccess(true);
            setFormData({
                name: '',
                email: user?.email || '',
                type: 'complaint',
                subject: '',
                message: ''
            });

        } catch (err) {
            console.error('Submission error:', err);
            setError('An error occurred while submitting the form. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feedback-container">
            {user ? <Navbar role={user.role} /> : <PublicNavbar />}
            {user && <div className="feedback-nav-spacer"></div>}

            <div className="feedback-content">
                <div className="feedback-header">
                    <h1 className="feedback-title">Feedback & Suggestions</h1>
                    <p className="feedback-subtitle">
                        We value your opinion! Share your complaints or suggestions to help us improve your experience
                    </p>
                </div>

                <form className="feedback-form" onSubmit={handleSubmit}>
                    {success && (
                        <div className="success-message">
                            ✓ Your message has been sent successfully! Thank you for contacting us.
                        </div>
                    )}

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="name">Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Message Type *</label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="complaint">Complaint</option>
                            <option value="suggestion">Suggestion</option>
                            <option value="feature">Feature Request</option>
                            <option value="bug">Bug Report</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject">Subject *</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Brief subject line"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message *</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Write your message in detail..."
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Sending...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Feedback;
