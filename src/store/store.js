import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './bookSlice'
import counterReducer from './counterSlice';
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    books: bookReducer,
    counter: counterReducer,
    user: userReducer,
  }

});

export default store;