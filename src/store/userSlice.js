import { createSlice } from '@reduxjs/toolkit';

// Check localStorage for stored user data on initial load
const initialState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(action.payload)); 
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;

export default userSlice.reducer;

// update the current user in Redux by dispatching setCurrentUser a user logs in.

// seems like all we need to handle local storage is "3 lines of code"
// this simple logic only suitable if we need local storage for auth and nothing else