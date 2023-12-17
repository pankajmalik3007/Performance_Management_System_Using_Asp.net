  // ManualApprovalComponent.js
  import React, { useEffect, useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { getAllManualRequests, updateManualRequestStatus } from './ManualApprovalSlice';

  const ManualApprovalComponent = () => {
    const dispatch = useDispatch();
    const manualRequests = useSelector((state) => state.manualApproval.leaves);
    const status = useSelector((state) => state.manualApproval.status);
    const error = useSelector((state) => state.manualApproval.error);
    const [leaveStatuses, setLeaveStatuses] = useState({});

    useEffect(() => {
      dispatch(getAllManualRequests());
    }, [dispatch]);

    
    const handleStatusChange = (e, manualRequestId) => {
      const newStatus = e.target.value;
      console.log('newStatus', newStatus);
    
      setLeaveStatuses((prevStatuses) => ({
        ...prevStatuses,
        [manualRequestId]: newStatus,
      }));
    
      dispatch(updateManualRequestStatus({ manualRequestId, newStatus }));
    };
    
    return (
      <div>
        {status === 'loading' && <div>Loading...</div>}
        {status === 'failed' && <div>Error: {error}</div>}
        {status === 'succeeded' && (
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Break Type</th>
                <th>Clock In Time</th>
                <th>Clock Out Time</th>
              
                <th>Employee Remark</th>
                <th>Status</th>
                <th>Action</th>
                
              </tr>
            </thead>
            <tbody>
              {manualRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.userId}</td>
                  <td>{request.breakType}</td>
                  <td>{request.clockInTime}</td>
                  <td>{request.clockOutTime}</td>
                  <td>{request.employeeRemark}</td>
                  <td>{request.status}</td>
                  <td>
                <select
                value={leaveStatuses[request.manualRequestId] || 'Pending'}
                onChange={(e) => handleStatusChange(e, request.id)}
                disabled={leaveStatuses[request.manualRequestId] !== undefined}
                data-request-id={request.id}  
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
        )}
      </div>
    );
  };

  export default ManualApprovalComponent;
