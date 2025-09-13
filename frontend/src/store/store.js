import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./features/bookSlice.js";

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export default store;
