import { createContext, useState, useEffect, useContext } from 'react';
import { userApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('veloura_token'));
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const profile = await userApi.getProfile();
      if (profile && !profile.error) {
        setUser(profile);
      } else {
        logout();
      }
    } catch (err) {
      console.warn('Failed to fetch user profile:', err);
      // Keep session if local user data exists or logout if unauthorized
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem('veloura_token', newToken);
    setToken(newToken);
    setUser(userData);
    fetchProfile();
  };

  const logout = () => {
    localStorage.removeItem('veloura_token');
    setToken(null);
    setUser(null);
  };

  const refreshProfile = async () => {
    await fetchProfile();
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, setUser, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
