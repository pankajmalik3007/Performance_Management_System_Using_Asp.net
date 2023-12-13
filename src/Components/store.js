// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import leaveReducer from '../Components/Leave/LeaveSlice'; 
import leaveStatusReducer from '../Components/LeaveStatusSlice';
import leaveHistoryReducer from '../Components/Leave/LeaveHistorySlice';
import updateComponentReducer from '../Components/Leave/updateComponentSlice';
import clockInOutReducer from '../Components/TimeManagement/ClockInOutSlice';
import startFinishBreakReducer from '../Components/TimeManagement/StartFinishBreakSlice';
import userReducer  from '../Components/UserComponent/userSlice';
import userAttendanceReducer from '../Components/Leave/UserAttendence/UserAttendenceSlice';
import manualRequestReducer from '../Components/ManualRequest/ManualRequestSlice';
import userReportReducer from '../Components/UserReportHistory/UserReportSlice';
import eventReducer from '../Components/Events/EventSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    leave: leaveReducer,
    leaveStatus: leaveStatusReducer,
    leaveHistory: leaveHistoryReducer,
    updateComponent: updateComponentReducer,
    clockInOut: clockInOutReducer,
    startFinishBreak: startFinishBreakReducer, 
    user: userReducer,
    userAttendance: userAttendanceReducer,
    manualRequest: manualRequestReducer,
    userReport: userReportReducer,
    events: eventReducer,
    
  },
});

export default store;
