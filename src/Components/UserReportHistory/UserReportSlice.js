// // UserReportSlice.js
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// const getToken = () => {
//   return localStorage.getItem('token');
// };

// export const fetchUserDetailsById = createAsyncThunk(
//   'userReport/fetchUserDetailsById',
//   async (_, { getState }) => {
//     try {
//       const token = localStorage.getToken();
//       const userId = String(JSON.parse(atob(token.split('.')[1])).UserId);
     
//       console.log('Fetched userId:', userId); 
//       console.log("fetch", userId); 

//       if (!userId) {
//         throw new Error('User ID not found in the token.');
//       }

//       const response = await fetch(`https://localhost:44356/api/Report/DataById?userId=${userId}`);

//       if (!response.ok) {
//         throw new Error('Failed to fetch user details');
//       }

//       const data = await response.json();
//       console.log('User details by id:', data);
//       return data;
//     } catch (error) {
//       console.error('Error fetching user details:', error);
//       throw error;
//     }
//   }
// );

// const userReportSlice = createSlice({
//   name: 'userReport',
//   initialState: {
//     userDetails: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserDetailsById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserDetailsById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userDetails = action.payload;
//       })
//       .addCase(fetchUserDetailsById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default userReportSlice.reducer;
// userReportSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';
const getToken = () => {
  return localStorage.getItem('token');
};

export const fetchUserDetailsById = createAsyncThunk(
    'userReport/fetchUserDetailsById',
    async (_, { rejectWithValue, getState }) => {
      try {
        const token = getToken();
        const userId = String(JSON.parse(atob(token.split('.')[1])).UserId);
       
        console.log('Fetched userId:', userId);
        
        if (!userId) {
          throw new Error('User ID not found in the token.');
        }
  
        const response = await fetch(`https://localhost:44356/api/Report/DataById?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log('API Response:', response);
  
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
  
        const data = await response.json();
        console.log('User details by id:', data);
        return data;
      } catch (error) {
        console.error('Error fetching user details:', error);
        return rejectWithValue(error.message);
      }
    
    }
   
  ); 
  
const userReportSlice = createSlice({
  name: 'userReport',
  initialState: {
    userDetails: null,
    loading: false,
    error: null,
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetailsById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserDetailsById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetailsById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userReportSlice.reducer;
