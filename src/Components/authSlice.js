
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userId: null, 
  token: localStorage.getItem('token') || null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.userId = action.payload.user?.id;
      
      state.token = action.payload.token;
      state.error = null;
    
      localStorage.setItem('token', action.payload.token);
    },
    
    loginFailure: (state, action) => {
      state.user = null;
      state.token = null;
      state.error = action.payload;

     
      localStorage.removeItem('token');
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;

     
      localStorage.removeItem('token');
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
