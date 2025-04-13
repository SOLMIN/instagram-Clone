import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Comment {
  id: string;
  text: string;
  likes: number;
}

export interface Post {
  id: string;
  username: string;
  avatar: string;
  image?: string;
  video?: string;
  caption: string;
  likes: number;
  comments: Comment[];
  isVerified: boolean;
  timeAgo: string;
}

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
export const fetchPosts = createAsyncThunk<Post[]>('posts/fetchPosts', async () => {
  const response = await fetch('/api/posts'); // Fetch posts from the backend
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  const data = await response.json();

  // Map API response to match the Post interface
  const posts = data.map((post: any) => ({
    id: post.id,
    username: post.username,
    avatar: post.avatar,
    image: post.image || undefined,
    video: post.video || undefined,
    caption: post.caption,
    likes: post.likes,
    comments: post.comments.map((comment: any) => ({
      id: comment.id,
      text: comment.text,
      likes: comment.likes,
    })),
    isVerified: post.isVerified,
    timeAgo: post.timeAgo,
  }));

  console.log('Fetched posts:', posts); // Log the fetched posts

  return posts;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
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
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },
});

export default postsSlice.reducer;