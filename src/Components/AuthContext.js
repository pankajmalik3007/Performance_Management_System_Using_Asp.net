// // AuthContext.js
// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

  
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
       
//         const response = await fetch('/api/user');
//         const userData = await response.json();

//         setUser(userData);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       } finally {
       
//         setLoading(false);
//       }
//     };

   
//     fetchUserData();
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const contextValue = useContext(AuthContext);
  if (!contextValue) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return contextValue;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
