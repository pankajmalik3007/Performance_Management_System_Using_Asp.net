import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Home from '../Home';
import LeaveApp from './LeaveApplication';
import LeaveStatus from './LeaveStatus';
import LeaveHistory from './LeaveHistory';

const PrivateRoute = () => {
  const { user, isLoading, userDataLoaded } = useAuth();

  if (isLoading || !userDataLoaded) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const isHR = user?.role === 'HR';
  console.log('User:', user);

  console.log('User Role:', user?.role);
  console.log('Is HR:', isHR);

  return (
    <div>
      <Home />
      <Routes>
        <Route path="leaveapp" element={<LeaveApp />} />
        <Route path="leavehistory" element={<LeaveHistory />} />
        {isHR ? (
          <Route path="leavestatus" element={<LeaveStatus />} />
        ) : (
          <Route path="leavestatus" element={<p>You do not have access to this page.</p>} />
        )}
      </Routes>
    </div>
  );
};

export default PrivateRoute;