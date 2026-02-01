import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si un utilisateur est connecté
    const storedUser = localStorage.getItem('ecowash_user');
    const storedAdmin = localStorage.getItem('ecowash_admin');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  // Inscription utilisateur
  const register = async (userData) => {
    const response = await axios.post('/api/auth/register', userData);
    const data = response.data;
    setUser(data);
    localStorage.setItem('ecowash_user', JSON.stringify(data));
    return data;
  };

  // Connexion utilisateur
  const login = async (email, password) => {
    const response = await axios.post('/api/auth/login', { email, password });
    const data = response.data;
    setUser(data);
    localStorage.setItem('ecowash_user', JSON.stringify(data));
    return data;
  };

  // Connexion admin
  const loginAdmin = async (email, password) => {
    const response = await axios.post('/api/auth/admin/login', { email, password });
    const data = response.data;
    setAdmin(data);
    localStorage.setItem('ecowash_admin', JSON.stringify(data));
    return data;
  };

  // Déconnexion utilisateur
  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecowash_user');
  };

  // Déconnexion admin
  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem('ecowash_admin');
  };

  const value = {
    user,
    admin,
    loading,
    register,
    login,
    loginAdmin,
    logout,
    logoutAdmin,
    isAuthenticated: !!user,
    isAdmin: !!admin
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
