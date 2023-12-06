
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 
import Home from './Home';
import LeaveApp from './LeaveApp';
import LeaveStatus from './LeaveStatus';

const PrivateRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log('User:', user);

 
  const isHR = user && user.role === 'HR';
  console.log('Is HR:', isHR);

 
  return (
    <div>
      <Home />
      <Routes>
        <Route path="leaveapp" element={<LeaveApp />} />
        {isHR ? (
          <Route path="leavestatus" element={<LeaveStatus />} />
        ) : (
          <Route path="leavestatus" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </div>
  );
};

export default PrivateRoute;
