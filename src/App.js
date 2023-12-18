

import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login';

import { AuthProvider } from './Components/AuthContext';
import PrivateRoute from './Components/Leave/PrivateRoute'; 


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('yourTokenKey');
    return Boolean(token);
  });

  useEffect(() => {
    if (isAuthenticated) {
      validateToken();
    }
  }, [isAuthenticated]);

  const validateToken = async () => {
    try {
      const isValidToken = await validateTokenOnServer();

      if (!isValidToken) {
        handleLogout();
      }
    } catch (error) {
      console.error('Error validating token:', error);
    }
  };

  const handleLogin = (token) => {
    localStorage.setItem('yourTokenKey', token);
    setIsAuthenticated(true);
    
  };

  const handleLogout = () => {
    localStorage.removeItem('yourTokenKey');
    setIsAuthenticated(false);
   
  };

  return (
    <Router>
      <AuthProvider>
        <AuthContext.Provider value={{ isAuthenticated }}>
          <div className="App">
            <Routes>
              <Route path="/*" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home/*" element={<PrivateRoute />} />
            </Routes>
          </div>
        </AuthContext.Provider>
      </AuthProvider>
    </Router>
  );
}

const validateTokenOnServer = async () => {
  return true; 
};

export default App;
