

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
// import Login from './Components/Login';
// import Home from './Components/Home';
// import LeaveApp from './Components/Leave/LeaveApplication';
// import { AuthProvider } from './Components/AuthContext';
// import LeaveStatus from './Components/Leave/LeaveStatus';
// import LeaveHistory from './Components/Leave/LeaveHistory';


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
//        <AuthProvider>
//       <AuthContext.Provider value={{ isAuthenticated, handleLogout }}>
//         <div className="App">
//           <Routes>
//             <Route path="/login" element={<Login onLogin={handleLogin} />} />
//             <Route path="/home/*" element={<PrivateRoute />} />
//           </Routes>
//         </div>
//       </AuthContext.Provider>
//       </AuthProvider>
//     </Router>
//   );
// }

// const PrivateRoute = () => {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <div>
//       <Home />
//       <Routes>
//         <Route path="leaveapp" element={<LeaveApp />} />
//         <Route path='leavestatus' element ={<LeaveStatus/>}/>
//         <Route path = 'leavehistory' element = {<LeaveHistory/>}/>
//       </Routes>
//     </div>
//   );
// };


// const validateTokenOnServer = async () => {
 
//   return true;
// };

// export default App;



import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import LeaveApp from './Components/Leave/LeaveApplication';
import { AuthProvider } from './Components/AuthContext';
import PrivateRoute from './Components/Leave/PrivateRoute'; 
import LeaveStatus from './Components/Leave/LeaveStatus';
import LeaveHistory from './Components/Leave/LeaveHistory';

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
    // You may redirect to the home page here
  };

  const handleLogout = () => {
    localStorage.removeItem('yourTokenKey');
    setIsAuthenticated(false);
    // You may redirect to the login page here
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

const validateTokenOnServer = async () => {
  return true; // Replace with your actual token validation logic
};

export default App;
