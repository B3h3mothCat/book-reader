import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINTS } from "../api/apiEndpoints";

export const updateUserBooks = createAsyncThunk(
    "books/updateUserBooks",
    async ({ currentUser, updatedBookCollections }, { rejectWithValue }) => {
      if (!currentUser) return rejectWithValue("User not authenticated");
  
      const updatedUser = { ...currentUser, bookCollections: updatedBookCollections };
  
      try {
        const response = await fetch(`${ENDPOINTS.UPDATE_USER_BY_ID(currentUser.id)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser),
        });
  
        if (!response.ok) throw new Error('Failed to update books');
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

const bookSlice = createSlice({
  name: "books",
  initialState: {
    bookCollections: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addBookToUser: (state, action) => {
      const { book, group } = action.payload;
      const existingBook = state.bookCollections.find(b => b.id === book.id);
      if (!existingBook) {
        state.bookCollections.push({ id: book.id, group, bookmarks: [] });
      }
    },
    delBookFromUser: (state, action) => {
      state.bookCollections = state.bookCollections.filter(b => b.id !== action.payload.id);
    },
    moveBook: (state, action) => {
      const { book, newGroup } = action.payload;
      const bookToMove = state.bookCollections.find(b => b.id === book.id);
      if (bookToMove) {
        bookToMove.group = newGroup;
      }
    }
  }
});

export const { addBookToUser, delBookFromUser, moveBook } = bookSlice.actions;
export default bookSlice.reducer;

// this one we keep as example, not using it