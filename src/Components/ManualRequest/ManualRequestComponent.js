import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertManualRequest } from './ManualRequestSlice';
import { useAuth } from '../AuthContext';
import { Button, TextField, Grid, Paper, Typography,  MenuItem } from '@mui/material';


const ManualRequestComponent = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const [leaveData, setLeaveData] = useState({
    breakType: '',
    clockInTime: '',
    clockOutTime: '',
    employeeRemark: '',
  });

  const status = useSelector((state) => state.manualRequest.status);
  const error = useSelector((state) => state.manualRequest.error);

  const handleInputChange = (e) => {
    setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!user || !user.UserId) {
      console.error('User ID not found. Unable to submit leave application.');
      return;
    }

    const payload = {
      userId: user.UserId,
      breakType: leaveData.breakType,
      status: 'Pending',
      clockInTime: leaveData.clockInTime,
      clockOutTime: leaveData.clockOutTime,
      employeeRemark: leaveData.employeeRemark,
    };

    dispatch(insertManualRequest(payload));
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
            label="Break Type"
            name="breakType"
            value={leaveData.breakType}
            onChange={handleInputChange}
            margin="normal"
          >
            <MenuItem value="Attendance">Attendance</MenuItem>
            <MenuItem value="Lunch Break">Lunch Break</MenuItem>
            <MenuItem value="Personal Break">Personal Break</MenuItem>
            <MenuItem value="Official Break">Official Break</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Clock In Time"
            type="datetime-local"
            name="clockInTime"
            value={leaveData.clockInTime}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Clock Out Time"
            type="datetime-local"
            name="clockOutTime"
            value={leaveData.clockOutTime}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Remark"
            name="employeeRemark"
            value={leaveData.employeeRemark}
            onChange={handleInputChange}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            className="submit-button"
            onClick={handleSubmit}
            disabled={status === 'loading'}
            style={{ marginTop: '20px' }}
          >
            Submit Leave Application
          </Button>
          {status === 'succeeded' && (
            <div style={{ color: 'green', marginTop: '10px' }}>Leave application submitted successfully!</div>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ManualRequestComponent;
