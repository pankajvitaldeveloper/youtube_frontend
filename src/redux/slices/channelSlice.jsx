// src/redux/slices/channelSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Fetch channel info with videos
export const fetchChannelById = createAsyncThunk(
  "channel/fetchById",
  async (channelId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/channel/${channelId}`);
      return res.data.channel;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch channel");
    }
  }
);

// all channel
export const fetchAllChannels = createAsyncThunk(
  "channel/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/channel`);
      console.log("chennel all", res.data.channel);
      return res.data.channel; // array of all channels
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch channels");
    }
  }
);

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    currentChannel: null,
    allChannels: [],   // ✅ store all channels
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannelById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannelById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChannel = action.payload;
      })
      .addCase(fetchChannelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

        .addCase(fetchAllChannels.fulfilled, (state, action) => {
        state.allChannels = action.payload;
      });

  },
});

export default channelSlice.reducer;
