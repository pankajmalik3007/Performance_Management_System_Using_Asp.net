// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserDetails = createAsyncThunk(
    'user/fetchUserDetails',
    async (username) => {
      try {
        const response = await fetch(`https://localhost:44356/api/Report/DataByUsername?username=${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        console.log('User details:', data);  
        return data;
      } catch (error) {
        console.error('Error fetching user details:', error); 
      }
    }
  );
  

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
