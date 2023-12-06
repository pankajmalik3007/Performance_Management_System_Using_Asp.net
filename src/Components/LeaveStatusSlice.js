// LeaveStatusSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const getAllLeaves = createAsyncThunk(
//   'leaveStatus/getAllLeaves',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch('https://localhost:44356/api/Leave/GetAllLeaves', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(errorMessage);
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const leaveStatusSlice = createSlice({
//   name: 'leaveStatus',
//   initialState: {
//     leaves: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getAllLeaves.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(getAllLeaves.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.leaves = action.payload;
//       })
//       .addCase(getAllLeaves.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export default leaveStatusSlice.reducer;
// leaveStatusSlice.js
// leaveStatusSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the thunk for updating leave status
export const updateLeaveStatus = createAsyncThunk(
    'leaveStatus/updateLeaveStatus',
    async ({ leaveId, status }, { rejectWithValue }) => {
      try {
        const response = await fetch(`https://localhost:44356/api/Leave/UpdateLeaveStatus?leaveId=${leaveId}&status=${status}`, {
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
  


export const getAllLeaves = createAsyncThunk(
  'leaveStatus/getAllLeaves',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const response = await fetch('https://localhost:44356/api/Leave/GetAllLeaves', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.auth.token}`, // Assuming you have auth state with token
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


const leaveStatusSlice = createSlice({
  name: 'leaveStatus',
  initialState: {
    leaves: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateLeaveStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateLeaveStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
      })
      .addCase(updateLeaveStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getAllLeaves.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllLeaves.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.leaves = action.payload;
      })
      .addCase(getAllLeaves.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default leaveStatusSlice.reducer;
