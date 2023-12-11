// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// const getToken = () => {
//     return localStorage.getItem('token');
//   };
// export const insertManualRequest = createAsyncThunk(
//   'manualRequest/insertManualRequest',
//   async (manualRequest, { rejectWithValue }) => {
//     try {
     
//         const token =  getToken();
//         console.log('Token:', token);
//         const userId = await JSON.parse(atob(token.split('.')[1])).UserId;

//       const response = await fetch('https://localhost:44356/api/ManualRequest/InsertManualRequest', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ ...manualRequest, userId }),
//       });

    
//       if (!response.ok) {
//         let errorMessage;

//         try {
//           const errorJson = await response.json();
//           errorMessage = errorJson.message || 'Failed to parse error message';
//         } catch (jsonError) {
//           errorMessage = response.statusText || 'Unknown error occurred';
//         }

//         console.error('Error:', errorMessage);
//         throw new Error(errorMessage);
//       }

      
//       return response.json();
//     } catch (error) {
//       console.error('Error:', error.message);
//       return rejectWithValue(error.message);
//     }
//   }
// );
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const insertManualRequest = createAsyncThunk(
  'leaveData/insertManualRequest',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch('https://localhost:44356/api/ManualRequest/InsertManualRequest', {
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
