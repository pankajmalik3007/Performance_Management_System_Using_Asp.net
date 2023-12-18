
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getToken = () => {
  return localStorage.getItem('token');
};

export const getAttendanceHistory = createAsyncThunk(
  'AttendanceHistory/getAttendanceHistory',
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const userId = await JSON.parse(atob(token.split('.')[1])).UserId;

      if (!userId) {
        throw new Error('User ID not found in the token.');
      }

      const response = await fetch(`https://localhost:7189/api/Report/DataById?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
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

const UserAttendanceSlice = createSlice({
  name: 'AttendanceHistory',
  initialState: {
    history: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAttendanceHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAttendanceHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.history = action.payload;
      })
      .addCase(getAttendanceHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default UserAttendanceSlice.reducer;
                                                                                                    