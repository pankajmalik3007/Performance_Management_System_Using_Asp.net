












// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Login from './Components/Login';
// import Home from './Components/Home';
// import LeaveApp from './Components/Leave/LeaveApplication';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     const token = localStorage.getItem('yourTokenKey');
//     return Boolean(token);
//   });

//   useEffect(() => {
//     if (isAuthenticated) {
//       validateToken();
//     }
//   }, [isAuthenticated]);

//   const validateToken = async () => {
//     try {
//       const isValidToken = await validateTokenOnServer();

//       if (!isValidToken) {
//         handleLogout();
//       }
//     } catch (error) {
//       console.error('Error validating token:', error);
//     }
//   };

//   const handleLogin = (token) => {
//     localStorage.setItem('yourTokenKey', token);
//     setIsAuthenticated(true);
    
//     return <Navigate to="/home" />;
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('yourTokenKey');
//     setIsAuthenticated(false);
   
//     return <Navigate to="/login" />;
//   };

//   return (
//     <Router>
//       <AuthContext.Provider value={{ isAuthenticated, handleLogout }}>
//         <div className="App">
//           <Routes>
//             <Route path="/login" element={<Login onLogin={handleLogin} />} />
//             <Route path="/home/*" element={<PrivateRoute />} />
//           </Routes>
//         </div>
//       </AuthContext.Provider>
//     </Router>
//   );
// }

// const PrivateRoute = () => {
//   const { isAuthenticated } = useAuth();

//   if (isAuthenticated) {
//     return <Home>
//        <Routes>
//           <Route path="leaveapp" element={<LeaveApp />} />
//         </Routes>
//       </Home>
//   } else {
   
//     return <Navigate to="/login" />;
//   }
// };

// const validateTokenOnServer = async () => {
//   return true;
// };

// export default App;



import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import LeaveApp from './Components/Leave/LeaveApplication';
import { AuthProvider } from './Components/AuthContext';


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
    return <Navigate to="/home" />;
  };

  const handleLogout = () => {
    localStorage.removeItem('yourTokenKey');
    setIsAuthenticated(false);
    return <Navigate to="/login" />;
  };

  return (
    <Router>
       <AuthProvider>
      <AuthContext.Provider value={{ isAuthenticated, handleLogout }}>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/home/*" element={<PrivateRoute />} />
          </Routes>
        </div>
      </AuthContext.Provider>
      </AuthProvider>
    </Router>
  );
}

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Home />
      <Routes>
        <Route path="leaveapp" element={<LeaveApp />} />
      </Routes>
    </div>
  );
};


const validateTokenOnServer = async () => {
  // Placeholder for token validation logic
  return true;
};

export default App;
