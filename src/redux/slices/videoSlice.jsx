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


// Fetch video by id
export const fetchVideoById = createAsyncThunk(
  "videos/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:5000/api/video/${id}`);
      const data = await res.json();
      return data.videoById;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Fetch by category
export const fetchVideosByCategory = createAsyncThunk(
  "videos/fetchByCategory",
  async (category) => {
    const res = await axios.get(`${API_URL}/api/videos/category/${category}`);
    console.log("CATEGORY API RESPONSE:", res.data.videos);
    return Array.isArray(res.data.videos) ? res.data.videos : [];
  }
);

// 🔎 Search videos (main results)
export const searchVideos = createAsyncThunk("videos/search", async (query) => {
  const res = await axios.get(`${API_URL}/api/videos/search/${query}`);
  console.log("SEARCH API RESPONSE:", res.data.results);
  return Array.isArray(res.data.results) ? res.data.results : [];
});

// 📝 Fetch search suggestions (for dropdown only)
export const fetchSuggestions = createAsyncThunk(
  "videos/fetchSuggestions",
  async (query) => {
    const res = await axios.get(`${API_URL}/api/videos/search/${query}`);
    console.log("SUGGESTIONS API RESPONSE:", res.data.results);
    // You can map to only needed fields
    return Array.isArray(res.data.results) ? res.data.results : [];
  }
);

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    items: [], // main results
    allItems: [],
    suggestions: [], // ✅ new for dropdown
    loading: false,
    error: null,
  },
  reducers: {
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Fetch All Videos ---
      .addCase(fetchAllVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.allItems = action.payload;
      })
      .addCase(fetchAllVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //fetch single video
      .addCase(fetchVideoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideoById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentVideo = action.payload;
      })
      .addCase(fetchVideoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Fetch Videos by Category ---
      .addCase(fetchVideosByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideosByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchVideosByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // --- Search Videos (final results) ---
      .addCase(searchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // ✅ overwrite main results
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // --- Fetch Suggestions (dropdown only) ---
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.suggestions = action.payload; // ✅ store in suggestions
      })
      .addCase(fetchSuggestions.rejected, (state) => {
        state.suggestions = [];
      });
  },
});

export const { clearSuggestions } = videoSlice.actions;
export default videoSlice.reducer;
