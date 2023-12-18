import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const getToken = () => {
  return localStorage.getItem('token');
};


export const updateComponent = createAsyncThunk(
  'updateComponent/update',
  async ({ updatedData }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const parsedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = parsedToken.UserId;
      const leaveIdFromToken = parsedToken.LeaveId;

      console.log('Parsed Token:', { userId, leaveIdFromToken });
      console.log('Updating leave with data:', updatedData);

      const response = await fetch(`https://localhost:7189/api/Leave/UpdateLeave/${leaveIdFromToken}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...updatedData,
          userId: userId,
        }),
      });

      console.log('Response:', response);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in updateComponent:', error);
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  status: 'idle',
  error: null,
  updatedData: null,
};


const updateComponentSlice = createSlice({
  name: 'updateComponent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateComponent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateComponent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.updatedData = action.payload;
      })
      
      .addCase(updateComponent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
      
      
  },
});

export default updateComponentSlice.reducer;
