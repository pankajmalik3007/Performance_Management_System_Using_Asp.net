
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getToken = () => {
  return localStorage.getItem('token');
};

export const ManualRequestbyuser = createAsyncThunk(
  'userManual/getUserManualRequests',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token =  getToken();
      const userId = await JSON.parse(atob(token.split('.')[1])).UserId;
      console.log(userId)
      const state = getState();

      if (!userId) {
        throw new Error('User ID not found in the state.');
      }

      console.log('Fetching data for user ID:', userId);
      const response = await fetch(`https://localhost:44356/api/ManualRequest/GetManualRequestByUserId/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('API Response:', response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error:', errorText);
        throw new Error(errorText);
      }

      const data = await response.json();
      console.log('Data:', data);

      return data;
    } catch (error) {
      console.error('Error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

const userManualSlice = createSlice({
  name: 'userManual',
  initialState: {
    userManualRequests: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ManualRequestbyuser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(ManualRequestbyuser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userManualRequests = action.payload;
      })
      .addCase(ManualRequestbyuser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userManualSlice.reducer;
