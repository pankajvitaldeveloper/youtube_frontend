import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL
const API_URL = import.meta.env.VITE_API_URL;

// Fetch all videos
export const fetchAllVideos = createAsyncThunk("videos/fetchAll", async () => {
  const res = await axios.get(`${API_URL}/api/video-all`);
  console.log("VIDEO API RESPONSE:", res.data.videoAllData);
  return Array.isArray(res.data.videoAllData) ? res.data.videoAllData : [];
});

// Fetch by category
export const fetchVideosByCategory = createAsyncThunk(
  "videos/fetchByCategory",
  async (category) => {
    const res = await axios.get(`${API_URL}/api/videos/category/${category}`);
    console.log("CATEGORY API RESPONSE:", res.data.videos);
    return Array.isArray(res.data.videos) ? res.data.videos : [];
  }
);

// Search videos
export const searchVideos = createAsyncThunk("videos/search", async (query) => {
  const res = await axios.get(`${API_URL}/api/videos/search/${query}`);
  console.log("SEARCH API RESPONSE:", res.data.results);
  return Array.isArray(res.data.results) ? res.data.results : [];
});

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    items: [], // always an array of videos
    allItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- Fetch All Videos ---
      .addCase(fetchAllVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // current visible list
        state.allItems = action.payload; // save full list for categories
      })
      .addCase(fetchAllVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // --- Fetch Videos by Category ---
      .addCase(fetchVideosByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideosByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // filtered videos
      })
      .addCase(fetchVideosByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // --- Search Videos ---
      .addCase(searchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default videoSlice.reducer;
