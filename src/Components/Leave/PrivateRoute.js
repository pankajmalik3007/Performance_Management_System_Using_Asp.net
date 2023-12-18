import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Home from '../Home';
import LeaveApp from './LeaveApplication';
import LeaveStatus from './LeaveStatus';
import LeaveHistory from './LeaveHistory';


import UserDetailsByName from '../UserComponent/UserDetailsByName';
import Attendence from './UserAttendence/Attendence';
import ManualRequestComponent from '../ManualRequest/ManualRequestComponent';
import UserReport from '../UserReportHistory/UserReport';
import EventComponent from '../Event/EventComponent';
import EventInsertComponent from '../EventInsert/EventInsertComponent';
import UserManualComponent from '../ManualRequest/ShowManual/UserManualComponent';
import ManualApprovalComponent from '../ManualRequest/HRAPPROVAL/ManualApprovalComponent';



const PrivateRoute = () => {
  const { user, isLoading, userDataLoaded } = useAuth();

  if (isLoading || !userDataLoaded) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const isHR = user?.role === 'HR';
 

 return (
  <div>
    <Home />
    <Routes>
      <Route path="leaveapp" element={<LeaveApp />} />
      <Route path="leavehistory" element={<LeaveHistory />} />
      <Route path = " Attendencehistory" element={<Attendence/>}/>
      <Route path = "ManualRequest" element = {<ManualRequestComponent/>}/>
      <Route path = "report" element = {<UserReport/>}/>
      <Route path = "Event" element = {<EventComponent/>}/>
      <Route path = "ShowManual" element = {<UserManualComponent/>}/>
     
     
      {isHR ? (
        <>
          <Route path="userhistory" element={<UserDetailsByName />} />
          <Route path="leavestatus" element={<LeaveStatus />} />
          <Route path = "RequestApproval" element ={<ManualApprovalComponent/>}/>
          <Route path = "EventInsert" element = {<EventInsertComponent/>}/>
        </>
      ) : (
        <>
          <Route path="userhistory" element={<p>You do not have access to this page.</p>} />
          <Route path="leavestatus" element={<p>You do not have access to this page.</p>} />
          <Route path="EventInsert" element={<p>You do not have access to this page.</p>} />
          <Route path="RequestApproval" element={<p>You do not have access to this page.</p>} />
        </>
      )}
    </Routes>
  </div>
);


};

export default PrivateRoute;
