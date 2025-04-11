import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockPosts, Post } from '../constants/mockData';
import userReducer from './userSlice';

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: mockPosts,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
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
    likeComment(state, action: PayloadAction<{ postId: string; commentId: string }>) {
      const post = state.posts.find((p) => p.id === action.payload.postId);
      const comment = post?.comments.find((c) => c.id === action.payload.commentId);
      if (comment) comment.likes++;
    },
  },
});

export const { likePost, addComment, likeComment } = postsSlice.actions;

const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;