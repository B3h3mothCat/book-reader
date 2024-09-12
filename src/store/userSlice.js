import { createSlice } from '@reduxjs/toolkit';

// Check localStorage for stored user data on initial load
const initialState = {
  currentUserR: JSON.parse(localStorage.getItem('currentUserR')) || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUserR: (state, action) => {
      state.currentUserR = action.payload;
      localStorage.setItem('currentUserR', JSON.stringify(action.payload)); 
    },
    clearCurrentUserR: (state) => {
      state.currentUserR = null;
      localStorage.removeItem('currentUserR');
    },
  },
});

export const { setCurrentUserR, clearCurrentUserR } = userSlice.actions;

export default userSlice.reducer;

// update the current user in Redux by dispatching setCurrentUser when a user logs in.

// seems like all we need to handle local storage is "3 lines of code"
// this simple logic only suitable if we need local storage for auth and nothing else