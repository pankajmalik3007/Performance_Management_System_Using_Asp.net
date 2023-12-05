import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useAuth } from '../AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { submitLeaveApplication } from './LeaveSlice';

const LeaveApp = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const [leaveData, setLeaveData] = useState({
    leaveType: '',
    reason: '',
    startLeaveDate: new Date(),
    endLeaveDate: new Date(),
  });

  const leaveStatus = useSelector((state) => state.leave.leaveStatus);
  const error = useSelector((state) => state.leave.error);

  const handleInputChange = (e) => {
    setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
  };

  const handleStartDateChange = (date) => {
    setLeaveData({ ...leaveData, startLeaveDate: date });
  };

  const handleEndDateChange = (date) => {
    setLeaveData({ ...leaveData, endLeaveDate: date });
  };

  const handleSubmit = () => {
    // Destructure user directly from your component's state
    const { user } = leaveData;
  
    if (!user) {
      // Handle the case where user is null (optional)
      console.error('User is null. Unable to submit leave application.');
      return;
    }
  
    const payload = {
      userId: user.id,
      leaveType: leaveData.leaveType,
      status: 'Pending',
      reason: leaveData.reason,
      startLeaveDate: leaveData.startLeaveDate.toISOString(),
      endLeaveDate: leaveData.endLeaveDate.toISOString(),
    };
  
    dispatch(submitLeaveApplication(payload));
  };
  
  
  return (
    <div className="leave-app-container">
      <h2>Leave Application</h2>
      <div style={{ color: 'red' }}>{error}</div>
      <label>
        Leave Type:
        <input type="text" name="leaveType" value={leaveData.leaveType} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Reason:
        <textarea name="reason" value={leaveData.reason} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Start Leave Date:
        <DatePicker
          selected={leaveData.startLeaveDate}
          onChange={handleStartDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </label>
      <br />
      <label>
        End Leave Date:
        <DatePicker
          selected={leaveData.endLeaveDate}
          onChange={handleEndDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </label>
      <br />
      <button className="submit-button" onClick={handleSubmit} disabled={leaveStatus === 'loading'}>
        Submit Leave Application
      </button>
      {leaveStatus === 'succeeded' && <div>Leave application submitted successfully!</div>}
    </div>
  );
};

export default LeaveApp;
