import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  token: localStorage.getItem('authToken') || null,
  userId: localStorage.getItem('userId') || null,
  loginError: null, // Add a loginError field to the state
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.loginError = null; // Reset loginError on successful login
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null;
      state.loginError = null; // Reset loginError on logout
    },
    setLoginError(state, action) {
      state.loginError = action.payload; // Set loginError
    },
  },
});

export const { login, logout, setLoginError } = authSlice.actions;

export default authSlice.reducer;
