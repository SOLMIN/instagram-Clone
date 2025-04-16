import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../constants/mockData'; // Use the shared Post type
import { RootState } from '../store/store';

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  hasMore: boolean; // To track if more posts are available
  currentPage: number; // Current page being fetched
}

const initialState: PostsState = {
  posts: [], // Initialize posts as an empty array
  loading: false,
  error: null,
  hasMore: true,
  currentPage: 1,
};

export const fetchPostsIfNeeded = createAsyncThunk<Post[], { page: number; limit: number }, { state: RootState }>(
  'posts/fetchPostsIfNeeded',
  async ({ page, limit }, { getState, rejectWithValue }) => {
    console.log('Fetching posts for page:', page, 'with limit:', limit);
    const state = getState();
    const cachedPosts = state.posts.posts;

    // Check if posts for the requested page are already cached
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const isPageCached = cachedPosts.some(
      (post, index) => index >= startIndex && index < endIndex
    );
    if (isPageCached) {
      console.log(`Page ${page} is already cached.`);
      return []; // Return an empty array instead of cached posts
    }

    // Otherwise, fetch posts from the API
    try {
      const response = await fetch(`/api/posts?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<Post>) {
      state.posts = [action.payload, ...state.posts]; // Add new post to the top without slicing
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
      .addCase(fetchPostsIfNeeded.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsIfNeeded.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;

        // Append new posts to the existing posts array
        state.posts = [...state.posts, ...action.payload];

        // Update `hasMore` based on whether new posts were fetched
        state.hasMore = action.payload.length > 0;

        // Increment the current page
        state.currentPage += 1;
      })
      .addCase(fetchPostsIfNeeded.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addPost, likePost, addComment } = postSlice.actions;

export default postSlice.reducer;