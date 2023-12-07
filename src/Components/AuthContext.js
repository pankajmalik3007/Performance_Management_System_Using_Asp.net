
// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const contextValue = useContext(AuthContext);
//   if (!contextValue) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return contextValue;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUserFromApi = async () => {
//       try {
//         const response = await fetch('https://localhost:44356/api/User/GetAllUserType', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch user data');
//         }

//         const userData = await response.json();
//         setUser(userData);
//       } catch (error) {
//         console.error('Error fetching user data:', error.message);
//       }
//     };

//     if (!user) {
//       fetchUserFromApi();
//     }
//   }, [user]);

//   return (
//     <AuthContext.Provider value={{ user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };




import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const contextValue = useContext(AuthContext);
  if (!contextValue) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return contextValue;
};

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  console.log('Stored Token:', storedToken);

  const decodedToken = storedToken ? JSON.parse(atob(storedToken.split('.')[1])) : null;
  console.log('Decoded Token:', decodedToken);

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  useEffect(() => {
    const fetchUserFromApi = async () => {
      try {
        const response = await fetch('https://localhost:44356/api/User/GetAllUserType', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      } finally {
        setIsLoading(false);
        setUserDataLoaded(true);
      }
    };

    if (!user) {
      fetchUserFromApi();
    }
  }, [user]);

  const mergedUser = {
    ...(user || {}),
    ...(decodedToken || {}),
    role: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
  };

  return (
    <AuthContext.Provider value={{ user: mergedUser, isHR: mergedUser?.role === 'HR', isLoading, userDataLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};
