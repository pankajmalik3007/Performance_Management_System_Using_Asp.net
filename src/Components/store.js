// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import leaveReducer from '../Components/Leave/LeaveSlice'; 
import leaveStatusReducer from '../Components/LeaveStatusSlice';
import leaveHistoryReducer from '../Components/Leave/LeaveHistorySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    leave: leaveReducer,
    leaveStatus: leaveStatusReducer,
    leaveHistory: leaveHistoryReducer,
  },
});

export default store;
