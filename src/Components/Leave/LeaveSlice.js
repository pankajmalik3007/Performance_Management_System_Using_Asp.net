// LeaveSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const submitLeaveApplication = createAsyncThunk(
  'leave/submitLeaveApplication',
  async (leaveData, { rejectWithValue }) => {
    try {
      const response = await fetch('https://localhost:44356/api/Leave/InsertLeave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
        body: JSON.stringify(leaveData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the leave slice
const leaveSlice = createSlice({
  name: 'leave',
  initialState: {
    leaveStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitLeaveApplication.pending, (state) => {
        state.leaveStatus = 'loading';
      })
      .addCase(submitLeaveApplication.fulfilled, (state) => {
        state.leaveStatus = 'succeeded';
      })
      .addCase(submitLeaveApplication.rejected, (state, action) => {
        state.leaveStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export default leaveSlice.reducer;
