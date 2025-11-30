import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await login(email, password);

    if (user) {
      if (user.role === "student") navigate("/rooms");
      else if (user.role === "teacher") navigate("/my-rooms");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <div className="page">
        <div className="header">
          <div className="login_title">Login</div>
          <div className="no_account">
            Don’t have an account?{" "}
            <Link to="/">
              <span>Sign up</span>
            </Link>
          </div>
        </div>

        {/* FORM START */}
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="input">
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="loginButton">
            Login
          </button>
        </form>
        {/* FORM END */}
      </div>
    </div>
  );
}

export default Login;
