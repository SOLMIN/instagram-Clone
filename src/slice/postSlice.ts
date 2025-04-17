import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../constants/mockData';
import { RootState } from '../store/store';

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
}

const initialState: PostsState = {
  posts: [],
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

export const deletePost = createAsyncThunk<void, string, { state: RootState }>(
  'posts/deletePost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
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
    // likePost(state, action: PayloadAction<string>) {
    //   const post = state.posts.find((p) => p.id === action.payload);
    //   if (post) post.likes++;
    // },
    // addComment(state, action: PayloadAction<{ postId: string; text: string }>) {
    //   const post = state.posts.find((p) => p.id === action.payload.postId);
    //   if (post) {
    //     post.comments.push({
    //       id: Date.now().toString(),
    //       text: action.payload.text,
    //       likes: 0,
    //     });
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsIfNeeded.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsIfNeeded.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
      
        // Filter out duplicate posts
        const newPosts = action.payload.filter(
          (newPost) => !state.posts.some((existingPost) => existingPost.id === newPost.id)
        );
        // Append only unique posts
        state.posts = [...state.posts, ...newPosts];
      
        state.hasMore = action.payload.length > 0;
      
        state.currentPage += 1;
      })
      .addCase(fetchPostsIfNeeded.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.meta.arg);
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const postIndex = state.posts.findIndex((post) => post.id === updatedPost.id);
        if (postIndex !== -1) {
          state.posts[postIndex] = updatedPost;
        }
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const postIndex = state.posts.findIndex((post) => post.id === updatedPost.id);
        if (postIndex !== -1) {
          state.posts[postIndex] = updatedPost;
        }
      });
  },
});

export const addComment = createAsyncThunk<
  Post,
  { postId: string; text: string },
  { state: RootState }
>('posts/addComment', async ({ postId, text }, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/posts/${postId}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Failed to add comment');
    }

    return await response.json();
  } catch (error: any) {
    return rejectWithValue(error.message || 'An error occurred');
  }
});

export const likePost = createAsyncThunk<Post, string, { state: RootState }>(
  'posts/likePost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to like post');
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);

export const { addPost } = postSlice.actions;

export default postSlice.reducer;