// // LeaveSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// export const submitLeaveApplication = createAsyncThunk(
//   'leave/submitLeaveApplication',
//   async (leaveData, { rejectWithValue }) => {
//     try {
//       const response = await fetch('https://localhost:44356/api/Leave/InsertLeave', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`, 
//         },
//         body: JSON.stringify(leaveData),
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

// // Create the leave slice
// const leaveSlice = createSlice({
//   name: 'leave',
//   initialState: {
//     leaveStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(submitLeaveApplication.pending, (state) => {
//         state.leaveStatus = 'loading';
//       })
//       .addCase(submitLeaveApplication.fulfilled, (state) => {
//         state.leaveStatus = 'succeeded';
//       })
//       .addCase(submitLeaveApplication.rejected, (state, action) => {
//         state.leaveStatus = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

//export default leaveSlice.reducer;


import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
        let errorMessage;

        try {
          // Attempt to parse the response as JSON
          const errorJson = await response.json();
          errorMessage = errorJson.message || 'Failed to parse error message';
        } catch (jsonError) {
          // Fallback to using the raw response text
          errorMessage = response.statusText || 'Unknown error occurred';
        }

        console.error('Error:', errorMessage); // Log the error
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error.message); // Log the error
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
