// ClockInOutSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isClockedIn: false,
  isLoading: false,
  error: null,
};

const clockInOutSlice = createSlice({
  name: 'clockInOut',
  initialState,
  reducers: {
    clockInStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    clockInSuccess: (state) => {
      state.isClockedIn = true;
      state.isLoading = false;
    },
    clockOutStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    clockOutSuccess: (state) => {
      state.isClockedIn = false;
      state.isLoading = false;
    },
    clockFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  clockInStart,
  clockInSuccess,
  clockOutStart,
  clockOutSuccess,
  clockFailure,
} = clockInOutSlice.actions;

export default clockInOutSlice.reducer;
