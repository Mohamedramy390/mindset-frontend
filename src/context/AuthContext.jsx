import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  
  // 👇 NEW: specific loading state for Authentication checking
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check the token when the app starts
    const checkToken = async () => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          
          // Check expiration
          if (decoded?.exp && Date.now() >= decoded.exp * 1000) {
            handleLogout();
          } else {
            setUser({ email: decoded.email, role: decoded.role, id: decoded.id });
            // Set header for global axios requests (optional if using interceptors)
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          }
        } catch (e) {
          console.error("Invalid JWT token", e);
          handleLogout();
        }
      } else {
        handleLogout();
      }
      
      // 👇 FINISHED checking, turn off loading
      setLoading(false);
    };

    checkToken();
  }, [token]);

  // Helper to clear everything
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  // Configure global Base URL (Keep this or use the api instance method)
  axios.defaults.baseURL = 'https://mindset-backend-production.up.railway.app/api';

  const login = async (email, password) => {
    try {
      const res = await axios.post("/users/login", { email, password });
      const newToken = res.data.data.token;
      
      localStorage.setItem("token", newToken);
      setToken(newToken);
      // user state will update automatically via the useEffect above
      return jwtDecode(newToken);
    } catch (err) {
      console.error(err.response?.data || err.message);
      return null;
    }
  };

  const register = async (firstName, secondName, email, password, role) => {
    try {
      const res = await axios.post("/users/register", {
        firstName, secondName, email, password, role,
      });
      return res.data;
    } catch (err) {
      console.error(err.response?.data || err.message);
      throw err;
    }
  };

  const logout = () => {
    handleLogout();
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}