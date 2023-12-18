import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { submitLeaveApplication } from './LeaveSlice';
import { Button, TextField, TextareaAutosize, Grid, Paper, Typography, Select, MenuItem } from '@mui/material';

const LeaveApp = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const [leaveData, setLeaveData] = useState({
    leaveType: '',
    reason: '',
    startLeaveDate: new Date().toISOString().slice(0, 16),
    endLeaveDate: new Date().toISOString().slice(0, 16),
  });

  const leaveStatus = useSelector((state) => state.leave.leaveStatus);
  const error = useSelector((state) => state.leave.error);

  useEffect(() => {
    if (!user) {
      console.error('User is null. Unable to submit leave application.');
    }
  }, [user]);

  const handleInputChange = (e) => {
    setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!user) {
      console.error('User is null. Unable to submit leave application.');
      return;
    }

    const payload = {
      userId: user.id,
      leaveType: leaveData.leaveType,
      status: 'Pending',
      reason: leaveData.reason,
      startLeaveDate: leaveData.startLeaveDate,
      endLeaveDate: leaveData.endLeaveDate,
    };

    dispatch(submitLeaveApplication(payload));
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Leave Application
          </Typography>
          <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>
          <TextField
            fullWidth
            select
            label="Leave Type"
            name="leaveType"
            value={leaveData.leaveType}
            onChange={handleInputChange}
            margin="normal"
          >
             <MenuItem value="Full Day">Full Day</MenuItem>
             <MenuItem value="Second Half">Second Half</MenuItem>
             <MenuItem value="First Half">First Half</MenuItem>
            <MenuItem value="Sick Leave">Sick Leave</MenuItem>
            <MenuItem value="Vacation">Vacation</MenuItem>
            <MenuItem value="Personal Leave">Personal Leave</MenuItem>
           
          </TextField>
          <br />
          <TextareaAutosize
            rowsMin={4}
            placeholder="Reason"
            name="reason"
            value={leaveData.reason}
            onChange={handleInputChange}
            style={{ width: '100%', marginTop: '10px' }}
          />
          <br />
          <TextField
            fullWidth
            label="Start Leave Date and Time"
            type="datetime-local"
            name="startLeaveDate"
            value={leaveData.startLeaveDate}
            onChange={handleInputChange}
            margin="normal"
          />
          <br />
          <TextField
            fullWidth
            label="End Leave Date and Time"
            type="datetime-local"
            name="endLeaveDate"
            value={leaveData.endLeaveDate}
            onChange={handleInputChange}
            margin="normal"
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            className="submit-button"
            onClick={handleSubmit}
            disabled={leaveStatus === 'loading'}
            style={{ marginTop: '20px' }}
          >
            Submit Leave Application
          </Button>
          {leaveStatus === 'succeeded' && (
            <div style={{ color: 'green', marginTop: '10px' }}>Leave application submitted successfully!</div>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LeaveApp;
