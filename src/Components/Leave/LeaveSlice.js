import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const submitLeaveApplication = createAsyncThunk(
  'leave/submitLeaveApplication',
  async (leaveData, { rejectWithValue }) => {
    try {
      const response = await fetch('https://localhost:7189/api/Leave/InsertLeave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(leaveData),
      });

      if (!response.ok) {
        let errorMessage;

        try {
        
          const errorJson = await response.json();
          errorMessage = errorJson.message || 'Failed to parse error message';
        } catch (jsonError) {
         
          errorMessage = response.statusText || 'Unknown error occurred';
        }

        console.error('Error:', errorMessage); 
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error.message); 
      return rejectWithValue(error.message);
    }
  }
);

const leaveSlice = createSlice({
  name: 'leave',
  initialState: {
    leaveStatus: 'idle',
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
