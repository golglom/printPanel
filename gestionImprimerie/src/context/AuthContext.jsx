import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const login = async (newToken) => {
    setLoading(true); 
    try {
      await new Promise((res) => setTimeout(res, 3000));
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 3000));
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      setToken(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const register = async (newToken) => {
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 3000));
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
