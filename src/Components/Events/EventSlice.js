import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch all events
export const fetchAllEvents = createAsyncThunk('events/fetchAllEvents', async () => {
  const response = await fetch('https://localhost:44356/api/Event/GetAllEvents');
  const data = await response.json();
  return data;
});

// Search events by name
export const searchEventsByName = createAsyncThunk('events/searchEventsByName', async (eventName) => {
  const response = await fetch(`https://localhost:44356/api/Event/SearchByEventName?eventName=${eventName}`);
  const data = await response.json();
  return data;
});

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(searchEventsByName.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchEventsByName.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(searchEventsByName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default eventSlice.reducer;
export const { } = eventSlice.actions;

// Selectors
export const selectAllEvents = (state) => state.events.events;
export const selectEventsStatus = (state) => state.events.status;
export const selectEventsError = (state) => state.events.error;
