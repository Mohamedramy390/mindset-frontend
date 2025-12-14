import React, { useState } from 'react'
import './Signup.css'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
    const [form, setForm] = useState({
        firstName: '',
        secondName: '',
        email: '',
        password: '',
        role: 'student'
    });

    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await register(
                form.firstName,
                form.secondName,
                form.email,
                form.password,
                form.role
            );
            navigate('/login');
        } catch (err) {
            const message =
                err?.response?.data?.msg ||
                err?.message ||
                'Registration failed';

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="page">

                {/* Header */}
                <div className="header">
                    <div className="create_account">Create your account</div>
                    <div className="have_account">
                        Already have an account? <Link to="/login"><span>Login</span></Link>
                    </div>
                </div>

                {/* FORM STARTS HERE */}
                <form className="inputs" onSubmit={onSubmit}>

                    <div className="input">
                        <input
                            name="email"
                            className="email"
                            type="email"
                            onChange={onChange}
                            placeholder="Email address"
                            required
                        />
                    </div>

                    <div className="input">
                        <input
                            name="firstName"
                            className="name"
                            type="text"
                            onChange={onChange}
                            placeholder="First Name"
                            required
                        />
                    </div>

                    <div className="input">
                        <input
                            name="secondName"
                            className="name"
                            type="text"
                            onChange={onChange}
                            placeholder="Second Name"
                            required
                        />
                    </div>

                    <div className="input">
                        <input
                            name="password"
                            className="pass"
                            type="password"
                            onChange={onChange}
                            placeholder="Password"
                            required
                        />
                    </div>

                    <div className="input">
                        <select
                            className="role"
                            name="role"
                            value={form.role}
                            onChange={onChange}
                            required
                        >
                            <option value="" disabled hidden>Select Role</option>
                            <option value="STUDENT">Student</option>
                            <option value="TEACHER">Teacher</option>
                        </select>
                    </div>

                    {/* Error message */}
                    {error && <div className="error-message">{error}</div>}

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="signupButton"
                        disabled={loading}
                    >
                        {loading ? 'Creating…' : 'Create account'}
                    </button>
                </form>
                {/* FORM ENDS HERE */}

            </div>
        </div>
    );
};

export default Signup;
