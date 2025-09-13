import { createSlice } from "@reduxjs/toolkit";
import { fetchBooks, fetchBookDetail } from "./bookThunk.js";

const initialState = {
  items: JSON.parse(localStorage.getItem("lastBooks")) || [],
  lastQuery: localStorage.getItem("lastQuery") || "",
  bookDetail: null,
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    clearBooks: (state) => {
      state.items = [];
      state.error = null;
      localStorage.removeItem("lastBooks");
      localStorage.removeItem("lastQuery");
    },
    clearBookDetail: (state) => {
      state.bookDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
        localStorage.setItem("lastBooks", JSON.stringify(state.items));
        localStorage.setItem("lastQuery", action.meta.arg);
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch books";
      });

    builder
      .addCase(fetchBookDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.bookDetail = null;
      })
      .addCase(fetchBookDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.bookDetail = action.payload;
      })
      .addCase(fetchBookDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch book details";
      });
  },
});

export const { clearBooks, clearBookDetail } = booksSlice.actions;
export default booksSlice.reducer;
