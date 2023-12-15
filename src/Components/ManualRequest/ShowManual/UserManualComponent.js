import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ManualRequestbyuser } from './UserManualSlice';

const UserManualComponent = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      console.log('Dispatching getUserManualRequests');
      dispatch(ManualRequestbyuser(userId));
    }
  }, [dispatch, userId]);

  const status = useSelector((state) => state.userManual.status);
  const error = useSelector((state) => state.userManual.error);
  const userManualRequests = useSelector((state) => state.userManual.userManualRequests);

  console.log('Redux State:', userManualRequests);
  console.log('User Manual Requests:', userManualRequests);
  console.log('Status:', status);
  console.log('Error:', error);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!userManualRequests || userManualRequests.length === 0) {
    console.log('No data available. Check API response and user ID.');
    return <div>No data available</div>;
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Break Type</th>
            <th>Clock In Time</th>
            <th>Clock Out Time</th>
            <th>Status</th>
            <th>Employee Remark</th>
          </tr>
        </thead>
        <tbody>
          {userManualRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.breakType}</td>
              <td>{request.clockInTime}</td>
              <td>{request.clockOutTime}</td>
              <td>{request.status}</td>
              <td>{request.employeeRemark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManualComponent;
