
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const updateManualRequestStatus = createAsyncThunk(
    'manualApproval/getAllManualRequests',
    async ({ manualRequestId, status }, { rejectWithValue }) => {
      try {
        const response = await fetch(`https://localhost:44356/api/ManualRequest/UpdateManualRequestStatus?manualRequestId=${manualRequestId}&userId=${status}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
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
  


export const getAllManualRequests = createAsyncThunk(
    'manualApproval/getAllManualRequests',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const response = await fetch('https://localhost:44356/api/ManualRequest/GetAllManualRequests', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.auth.token}`, 
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
const manualApprovalSlice = createSlice({
    name: 'manualApproval',
    initialState: {
      leaves: [],
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(updateManualRequestStatus.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(updateManualRequestStatus.fulfilled, (state, action) => {
          state.status = 'succeeded';
          
        })
        .addCase(updateManualRequestStatus.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        .addCase(getAllManualRequests.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getAllManualRequests.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.leaves = action.payload;
        })
        .addCase(getAllManualRequests.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        });
    },
  });
  
  export default manualApprovalSlice.reducer;
  