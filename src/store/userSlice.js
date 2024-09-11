import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUserR: null,
  },
  reducers: {
    setCurrentUserR: (state, action) => {
      state.currentUserR = action.payload;
    },
    clearCurrentUserR: (state) => {
      state.currentUserR = null;
    },
  },
});

export const { setCurrentUserR, clearCurrentUserR } = userSlice.actions;

export default userSlice.reducer;

// update the current user in Redux by dispatching setCurrentUser when a user logs in.