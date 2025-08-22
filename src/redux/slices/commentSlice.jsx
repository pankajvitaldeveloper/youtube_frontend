import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
// ✅ Add comment
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ videoId, text, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/comments`,
        { videoId, text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // ✅ controller returns { comment: populatedComment }
      return res.data.comment;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add comment"
      );
    }
  }
);
// ✅ Fetch comments by videoId
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (videoId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/comments/${videoId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch comments"
      );
    }
  }
);

// ✅ Update Comment
// ✅ Update comment
export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({ id, text, token }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API_URL}/api/comments/${id}`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.comment; // ✅ populated user
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update comment");
    }
  }
);

// deleteComment
// thunk
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_URL}/api/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.id; // ✅ deleted comment id
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete comment"
      );
    }
  }
);

// reducer
extraReducers: (builder) => {
  builder
    // ...
    .addCase(deleteComment.fulfilled, (state, action) => {
      state.items = state.items.filter(c => c._id !== action.payload && c.parentCommentId !== action.payload);
    });
}


const commentSlice = createSlice({
  name: "comments",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchComments
    .addCase(fetchComments.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchComments.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload.comments || [];
    })
    .addCase(fetchComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // addComment
     .addCase(addComment.fulfilled, (state, action) => {
        const newC = action.payload;
        // Make sure shape matches others (replies array exists)
        if (!newC.replies) newC.replies = [];
        state.items.unshift(newC);
      })
    // updateComment
    // .addCase(updateComment.fulfilled, (state, action) => {
    //   state.items = state.items.map((c) =>
    //     c._id === action.payload._id ? action.payload : c
    //   );
    // })
    .addCase(updateComment.fulfilled, (state, action) => {
  const index = state.items.findIndex(c => c._id === action.payload._id);
  if (index !== -1) state.items[index] = action.payload;
})
.addCase(deleteComment.fulfilled, (state, action) => {
        const deletedId = action.payload;

        // remove top-level match
        state.items = state.items
          .filter((c) => c._id !== deletedId)
          .map((c) => ({
            ...c,
            // remove replies that match the deleted id or have parentCommentId === deleted id
            replies: (c.replies || []).filter(
              (r) => r._id !== deletedId && r.parentCommentId !== deletedId
            ),
          }));
      });

  },
});

export default commentSlice.reducer;
