import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/axios.instance.js";

// Async thunk for searching books
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (query, { rejectWithValue }) => {
    try {
      const res = await api.get(`/search?q=${query}`);
      return res.data.docs; // OpenLibrary response has docs[]
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching books");
    }
  }
);

// Async thunk for fetching a single book detail
export const fetchBookDetail = createAsyncThunk(
  "books/fetchBookDetail",
  async (workId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/books/${workId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching book details");
    }
  }
);
