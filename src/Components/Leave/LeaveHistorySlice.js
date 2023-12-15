// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


// const getToken = () => {
//   return localStorage.getItem('token');
// };


// export const getLeaveHistory = createAsyncThunk(
//   'leaveHistory/getLeaveHistory',
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = getToken();

      
//       const userId = JSON.parse(atob(token.split('.')[1])).UserId;

//       if (!userId) {
//         throw new Error('User ID not found in the token.');
//       }

//       const response = await fetch(`https://localhost:44356/api/LeaveHistory/${userId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
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

// const leaveHistorySlice = createSlice({
//   name: 'leaveHistory',
//   initialState: {
//     history: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getLeaveHistory.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(getLeaveHistory.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.history = action.payload;
//       })
//       .addCase(getLeaveHistory.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export default leaveHistorySlice.reducer;




import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getToken = () => {
  return localStorage.getItem('token');
};

export const getLeaveHistory = createAsyncThunk(
  'leaveHistory/getLeaveHistory',
  async (_, { rejectWithValue }) => {
    try {
      const token =  getToken();
const userId = await JSON.parse(atob(token.split('.')[1])).UserId;


     
      if (!userId) {
        throw new Error('User ID not found in the token.');
      }

      const response = await fetch(`https://localhost:44356/api/LeaveHistory/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
console.log("Api response " , response);
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


const leaveHistorySlice = createSlice({
  name: 'leaveHistory',
  initialState: {
    history: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeaveHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLeaveHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.history = action.payload;
      })
      .addCase(getLeaveHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
     
  },
});

export default leaveHistorySlice.reducer;
