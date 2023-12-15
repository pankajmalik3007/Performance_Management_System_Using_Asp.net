// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// const getToken = () => {
//   return localStorage.getItem('token');
// };

// export const insertEvent = createAsyncThunk(
//   'eventInsert/insertEvent',
//   async (eventData, { rejectWithValue }) => {
//     try {
//       const token = getToken();

//       if (!token) {
//         throw new Error('Token not found.');
//       }

//       const response = await fetch('https://localhost:44356/api/Event', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(eventData),
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

// const eventInsertSlice = createSlice({
//   name: 'eventInsert',
//   initialState: {
//     insertedEvent: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(insertEvent.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(insertEvent.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.insertedEvent = action.payload;
//       })
//       .addCase(insertEvent.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export default eventInsertSlice.reducer;



import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getToken = () => {
  return localStorage.getItem('token');
};

export const insertEvent = createAsyncThunk(
  'eventInsert/insertEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error('Token not found.');
      }

      const response = await fetch('https://localhost:44356/api/Event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
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

export const fetchAllEvents = createAsyncThunk(
  'eventInsert/fetchAllEvents',
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error('Token not found.');
      }

      const response = await fetch('https://localhost:44356/api/Event', {
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

export const deleteEventById = createAsyncThunk(
  'eventInsert/deleteEventById',
  async (eventId, { rejectWithValue }) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error('Token not found.');
      }

      const response = await fetch(`https://localhost:44356/api/Event/${eventId}`, {
        method: 'DELETE',
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

const eventInsertSlice = createSlice({
  name: 'eventInsert',
  initialState: {
    insertedEvent: null,
    allEvents: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(insertEvent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(insertEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.insertedEvent = action.payload;
      })
      .addCase(insertEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchAllEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allEvents = action.payload;
      })
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteEventById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteEventById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Optionally update the state after a successful delete if needed
      })
      .addCase(deleteEventById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default eventInsertSlice.reducer;
