import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './bookSlice'
import counterReducer from './counterSlice';

const store = configureStore({
  reducer: {
    books: bookReducer,
    counter: counterReducer,
  }

});

export default store;