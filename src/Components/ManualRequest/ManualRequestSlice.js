
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const insertManualRequest = createAsyncThunk(
  'leaveData/insertManualRequest',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch('https://localhost:7189/api/ManualRequest/InsertManualRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error:', errorText);
        throw new Error(errorText);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);



const manualRequestSlice = createSlice({
  name: 'leaveData',
  initialState: {
    status: 'idle',  
    error: null,    
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(insertManualRequest.pending, (state) => {
        state.status = 'loading';
        state.error = null;  
      })
      .addCase(insertManualRequest.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(insertManualRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default manualRequestSlice.reducer;
