import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../constants/mockData'; // Use the shared Post type

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

// Async thunk to fetch posts
export const fetchPosts = createAsyncThunk<Post[]>('posts/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('/api/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return await response.json();
  } catch (error: any) {
    return rejectWithValue(error.message || 'An error occurred');
  }
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<Post>) {
      state.posts.unshift(action.payload); // Add new post to the top
    },
    likePost(state, action: PayloadAction<string>) {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) post.likes++;
    },
    addComment(state, action: PayloadAction<{ postId: string; text: string }>) {
      const post = state.posts.find((p) => p.id === action.payload.postId);
      if (post) {
        post.comments.push({
          id: Date.now().toString(),
          text: action.payload.text,
          likes: 0,
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addPost, likePost, addComment } = postSlice.actions;

export default postSlice.reducer;