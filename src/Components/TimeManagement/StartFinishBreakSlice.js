import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isBreakStarted: false,
  isLoading: false,
  error: null,
};

const startFinishBreakSlice = createSlice({
  name: 'startFinishBreak',
  initialState,
  reducers: {
    startBreakStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    startBreakSuccess: (state) => {
      state.isBreakStarted = true;
      state.isLoading = false;
    },
    finishBreakStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    finishBreakSuccess: (state) => {
      state.isBreakStarted = false;
      state.isLoading = false;
    },
    breakFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  startBreakStart,
  startBreakSuccess,
  finishBreakStart,
  finishBreakSuccess,
  breakFailure,
} = startFinishBreakSlice.actions;

export default startFinishBreakSlice.reducer;
