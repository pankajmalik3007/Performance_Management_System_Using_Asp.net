// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import leaveReducer from '../Components/Leave/LeaveSlice'; 
import leaveStatusReducer from '../Components/LeaveStatusSlice';
import leaveHistoryReducer from '../Components/Leave/LeaveHistorySlice';
import updateComponentReducer from '../Components/Leave/updateComponentSlice';
import clockInOutReducer from '../Components/TimeManagement/ClockInOutSlice';
import startFinishBreakReducer from '../Components/TimeManagement/StartFinishBreakSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    leave: leaveReducer,
    leaveStatus: leaveStatusReducer,
    leaveHistory: leaveHistoryReducer,
    updateComponent: updateComponentReducer,
    clockInOut: clockInOutReducer,
    startFinishBreak: startFinishBreakReducer, 

  },
});

export default store;
