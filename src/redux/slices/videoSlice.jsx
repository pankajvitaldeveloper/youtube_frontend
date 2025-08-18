import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL
const API_URL = "http://localhost:5000/api";

// ✅ Fetch all videos
export const fetchAllVideos = createAsyncThunk("videos/fetchAll", async () => {
  const res = await axios.get("http://localhost:5000/api/video-all"); 
  console.log("VIDEO API RESPONSE:", res.data.videoAllData); // 👈 check this
  return res.data.videoAllData;
});


// ✅ Fetch by category
export const fetchVideosByCategory = createAsyncThunk(
  "videos/fetchByCategory",
  async (category) => {
    const res = await axios.get(`${API_URL}/videos/category/${category}`);
    return res.data; // array of videos
  }
);

// ✅ Search videos
export const searchVideos = createAsyncThunk("videos/search", async (query) => {
  const res = await axios.get(`${API_URL}/videos/search/${query}`);
  return res.data; // array of videos
});

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    items: [], // always an array of videos
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All videos
      .addCase(fetchAllVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // ✅ always array
      })
      .addCase(fetchAllVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Videos by category
      .addCase(fetchVideosByCategory.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      // Search videos
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default videoSlice.reducer;
