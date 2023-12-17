import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ManualRequestbyuser } from './UserManualSlice';

const UserManualComponent = () => {
  const dispatch = useDispatch();
  const storedToken = localStorage.getItem('token');
  const status = useSelector((state) => state.userManual.status);
  const error = useSelector((state) => state.userManual.error);
  const userManualRequests = useSelector((state) => state.userManual.userManualRequests);

  useEffect(() => {
    const fetchData = async() =>{
      try{
        if(storedToken){
          const uniqueUserIds = [...new Set(userManualRequests.map((leave) => leave.userId))];
          console.log(uniqueUserIds);
          if (uniqueUserIds) {
            console.log('Dispatching getUserManualRequests');
            dispatch(ManualRequestbyuser(uniqueUserIds));
          }
        }
      }catch(error){
  
      }
    }

    fetchData();
  }, [dispatch]);



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
            <th>Employee Remark</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {userManualRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.breakType}</td>
              <td>{request.clockInTime}</td>
              <td>{request.clockOutTime}</td>
              <td>{request.employeeRemark}</td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManualComponent;
