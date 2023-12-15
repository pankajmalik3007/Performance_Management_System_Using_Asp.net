// ManualApprovalComponent.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllManualRequests, updateManualRequestStatus } from './ManualApprovalSlice';

const ManualApprovalComponent = () => {
  const dispatch = useDispatch();
  const manualRequests = useSelector((state) => state.manualApproval.manualRequests);
  const status = useSelector((state) => state.manualApproval.status);
  const error = useSelector((state) => state.manualApproval.error);

  const [selectedStatus, setSelectedStatus] = useState('Pending');

  useEffect(() => {
    dispatch(getAllManualRequests());
  }, [dispatch]);

  const handleStatusChange = (manualRequestId) => {
    dispatch(updateManualRequestStatus({ manualRequestId, newStatus: selectedStatus }));
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
              <th>Status</th>
              <th>Employee Remark</th>
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
                <td>
                  <select value={request.status} onChange={(e) => setSelectedStatus(e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="Approval">Approval</option>
                    <option value="Reject">Reject</option>
                  </select>
                </td>
                <td>{request.employeeRemark}</td>
                <td>
                  <button onClick={() => handleStatusChange(request.id)}>Update Status</button>
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
