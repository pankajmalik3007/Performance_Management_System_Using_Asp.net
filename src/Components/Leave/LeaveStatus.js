import React, { useEffect, useState } from 'react';
import './LeaveStatus.css';

import { useDispatch, useSelector } from 'react-redux';
import { getAllLeaves, updateLeaveStatus } from '../LeaveStatusSlice';

const LeaveStatus = () => {
  const dispatch = useDispatch();
  const leaves = useSelector((state) => state.leaveStatus.leaves);
  const [usernames, setUsernames] = useState({});
  const [leaveStatuses, setLeaveStatuses] = useState({});

  useEffect(() => {
    dispatch(getAllLeaves());
  }, [dispatch]);

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
    const fetchUsernames = async () => {
      const uniqueUserIds = [...new Set(leaves.map((leave) => leave.userId))];

      const usernamesMap = {};
      for (const userId of uniqueUserIds) {
        const username = await fetchUsernameById(userId);
        usernamesMap[userId] = username;
      }

      setUsernames(usernamesMap);
    };

    fetchUsernames();
  }, [leaves]);

  const handleStatusChange = (e, leaveId) => {
    const newStatus = e.target.value;
  
    setLeaveStatuses((prevStatuses) => ({
      ...prevStatuses,
      [leaveId]: newStatus,
    }));
  
    dispatch(updateLeaveStatus({ leaveId, status: newStatus }));

  };
  return (
    <div className="leave-status-container">
      <h2>Leave Status (HR Only)</h2>
      <table>
        <thead>
          <tr>
            <th>LeaveId</th>
            <th>Type</th>
            {/* <th>Username</th> */}
            <th>Reason</th>
            <th>Leave Request Time</th>
            <th>Start Leave Date</th>
            <th>End Leave Date</th>
            <th>Leave Status Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.id}</td>
              <td>{leave.leaveType}</td>
              {/* <td>{usernames[leave.userId] || 'N/A'}</td> */}
              <td>{leave.reason}</td>
              <td>{leave.leaveRequestTime}</td>
              <td>{leave.startLeaveDate}</td>
              <td>{leave.endLeaveDate}</td>
              <td>{leave.leaveStatusTime}</td>
              <td>{leave.status}</td>
              <td>
              <select
              value={leaveStatuses[leave.leaveId] || 'Pending'}
              onChange={(e) => handleStatusChange(e, leave.id)}
              disabled={leaveStatuses[leave.leaveId] !== undefined}
              data-leave-id={leave.id}  
              >
              <option value="Pending" disabled>Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveStatus;
