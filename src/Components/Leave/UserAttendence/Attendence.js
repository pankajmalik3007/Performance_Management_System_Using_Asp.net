import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAttendanceHistory } from './UserAttendenceSlice';
import { useAuth } from '../../AuthContext';

const Attendence = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const storedToken = localStorage.getItem('token');
  const [usernames, setUsernames] = useState({});                                                                                                   
  const [loading, setLoading] = useState(true);
  const leaves = useSelector((state) => state.leaveHistory.history);

  const fetchUsernameById = async (userId) => {
    try {
      const response = await fetch(`https://localhost:7189/api/User/GetUserType?Id=${userId}`);
      const data = await response.json();   

      if (response.ok) {
        return data.username;
      } else {
        console.error(`Error fetching username for user ID ${userId}: ${data.message}`);
        return 'N/A';
      }
    } catch (error) {
      console.error(`Error fetching username for user ID ${userId}: ${error.message}`);
      return 'N/A';
    }
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (storedToken && loading) {
          await dispatch(getAttendanceHistory()); // Fix the function name here
  
          const uniqueUserIds = [...new Set(leaves.map((leave) => leave.userId))];
  
          if (Object.keys(usernames).length !== uniqueUserIds.length) {
            const usernamesMap = {};
            for (const userId of uniqueUserIds) {
              const username = await fetchUsernameById(userId);
              usernamesMap[userId] = username;
            }
  
            setUsernames(usernamesMap);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [dispatch, storedToken, loading, leaves, usernames]);
  
  const status = useSelector((state) => state.AttendanceHistory.status);
  const error = useSelector((state) => state.AttendanceHistory.error);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Leave History </h2>
      <table>
        <thead>
          <tr>
           
            <th>Type</th>
            <th>Username</th>
            <th>Reason</th>
            <th>Leave Request Time</th>
            <th>Start Leave Date</th>
            <th>End Leave Date</th>
            <th>Leave Status Time</th>
            <th>Status</th>
           
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
             
              <td>{leave.leaveType}</td>
              <td>{usernames[leave.userId] || 'N/A'}</td>
              <td>{leave.reason}</td>
              <td>{leave.leaveRequestTime}</td>
              <td>{leave.startLeaveDate}</td>
              <td>{leave.endLeaveDate}</td>
              <td>{leave.leaveStatusTime}</td>
              <td>{leave.status}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendence;