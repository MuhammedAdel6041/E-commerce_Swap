/* eslint-disable react-refresh/only-export-components */
 
import  { createContext, useContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("authToken") || null,
    user: null,
    isAuthenticated: !!localStorage.getItem("authToken"),
  });

  const login = useCallback((token, user, expiresIn = 3600) => {
    const expiresAt = new Date().getTime() + expiresIn * 1000;
    setAuth({ token, user, isAuthenticated: true });
    localStorage.setItem("authToken", token);
    localStorage.setItem("expiresAt", expiresAt);
  }, []);

  const logout = useCallback(() => {
    setAuth({ token: null, user: null, isAuthenticated: false });
    localStorage.removeItem("authToken");
    localStorage.removeItem("expiresAt");
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const expiresAt = localStorage.getItem("expiresAt");

    if (storedToken && expiresAt) {
      const currentTime = new Date().getTime();
      if (currentTime > expiresAt) {
        logout();
      } else {
        setAuth((prev) => ({
          ...prev,
          token: storedToken,
          isAuthenticated: true,
        }));
      }
    }
  }, [logout]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Add PropTypes validation for children
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
