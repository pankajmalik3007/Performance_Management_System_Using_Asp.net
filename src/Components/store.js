// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import leaveReducer from '../Components/Leave/LeaveSlice'; // Import the leave reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    leave: leaveReducer, // Include the leave reducer
  },
});

export default store;
