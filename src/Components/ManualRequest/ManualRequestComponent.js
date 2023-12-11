import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertManualRequest } from './ManualRequestSlice';
import DatePicker from 'react-datepicker';
import { useAuth } from '../AuthContext';
import { Button, TextField,TextareaAutosize, Grid, Paper, Typography } from '@mui/material';

const ManualRequestComponent = () => {
//   const { userId, userDataLoaded } = useAuth();
//   const dispatch = useDispatch();
  // const status = useSelector((state) => state.manualRequest.status);
  // const error = useSelector((state) => state.manualRequest.error);

//   const [manualRequestData, setManualRequestData] = useState({
//     breakType: '',
//     clockInTime: '',
//     clockOutTime: '',
//     employeeRemark: '',
//   });

//   useEffect(() => {
//     if (userDataLoaded) {
//       fetchUserFromApi();
//     }
//   }, [userDataLoaded]);

//   const fetchUserFromApi = async () => {
//     try {
//       // Your API call logic here, if needed
//     } catch (error) {
//       console.error('Error fetching user data:', error.message);
//     }
//   };

//   const handleInputChange = (e) => {
//     setManualRequestData({ ...manualRequestData, [e.target.name]: e.target.value });
//   };

//   const handleAddRequest = async () => {
//     try {
//       const token = localStorage.getItem('token');

//       console.log('UserID from AuthContext:', userId);

//       if (!Number.isNaN(userId) && userId > 0) {
//         const payload = {
//           userId,
//           ...manualRequestData,
//           status: 'Pending',
//         };

//         console.log('Request Payload:', payload);

//         await dispatch(insertManualRequest({ ...payload, token }));
//       } else {
//         console.error('Invalid or missing user ID from AuthContext');
//       }
//     } catch (error) {
//       console.error('Error adding manual request:', error.message);
//     }
//   };

//   return (
//     <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
//       <Grid item xs={12} sm={8} md={6} lg={4}>
//         <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
//           <Typography variant="h4" gutterBottom>
//             Manual Request
//           </Typography>
//           <TextField
//             fullWidth
//             label="Break Type"
//             type="text"
//             name="breakType"
//             value={manualRequestData.breakType}
//             onChange={handleInputChange}
//             margin="normal"
//           />
//           <br />
//           <TextField
//             fullWidth
//             label="Clock In Time"
//             type="datetime-local"
//             name="clockInTime"
//             value={manualRequestData.clockInTime}
//             onChange={handleInputChange}
//             margin="normal"
//           />
//           <br />
//           <TextField
//             fullWidth
//             label="Clock Out Time"
//             type="datetime-local"
//             name="clockOutTime"
//             value={manualRequestData.clockOutTime}
//             onChange={handleInputChange}
//             margin="normal"
//           />
//           <br />
//           <TextField
//             fullWidth
//             label="Employee Remark"
//             type="text"
//             name="employeeRemark"
//             value={manualRequestData.employeeRemark}
//             onChange={handleInputChange}
//             margin="normal"
//           />
//           <br />
//           <Button
//             variant="contained"
//             color="primary"
//             className="submit-button"
//             onClick={handleAddRequest}
//             style={{ marginTop: '20px' }}
//           >
//             Add Manual Request
//           </Button>
//           {status === 'loading' && <div>Loading...</div>}
//           {status === 'failed' && <div style={{ color: 'red' }}>{error}</div>}
//         </Paper>
//       </Grid>
//     </Grid>
//   );
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
  useEffect(() => {
    if (!user) {
      console.error('User is null. Unable to submit leave application.');
    }
  }, [user]);
  const handleInputChange = (e) => {
    setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
  };
  const handleStartDateChange = (date) => {
    setLeaveData({ ...leaveData, clockInTime: date });
  };
  const handleEndDateChange = (date) => {
    setLeaveData({ ...leaveData, clockOutTime: date });
  };

  const handleSubmit = () => {
    if (!user) {
      console.error('User is null. Unable to submit leave application.');
      return;
    }

    const payload = {
      userId: user.id,
      
      breakType: leaveData.breakType,
      status: 'Pending',
      clockInTime: leaveData.clockInTime.toISOString(),
      clockOutTime: leaveData.clockOutTime.toISOString(),
      employeeRemark: "Some value", 
    };
    console.log('User ID:', user.id);
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
  label="BreakType"
  name="breakType" 
  value={leaveData.breakType}
  onChange={handleInputChange}
  margin="normal"
/>

<DatePicker
  selected={leaveData.clockInTime}
  onChange={handleStartDateChange}
  showTimeSelect
  timeFormat="HH:mm"
  timeIntervals={15}
  dateFormat="MMMM d, yyyy h:mm aa"
  style={{ marginTop: '10px' }}
/>
<br />
<DatePicker
  selected={leaveData.clockOutTime}
  onChange={handleEndDateChange}
  showTimeSelect
  timeFormat="HH:mm"
  timeIntervals={15}
  dateFormat="MMMM d, yyyy h:mm aa"
  style={{ marginTop: '10px' }}
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
