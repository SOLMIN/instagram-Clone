import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockPosts, Post } from '../constants/mockData';
import userReducer, { UserState } from './userSlice'; // Import UserState
import postsReducer from './postSlice'; // Import postsSlice
interface PostsState {
  posts: Post[];
  loading: boolean; // Add the loading property
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false, // Initialize the loading property
  error: null,
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
    addPost(state, action: PayloadAction<Post>) {
      state.posts.unshift(action.payload); // Add the new post to the top of the list
    },
  },
});




export const { likePost, addComment, likeComment, addPost } = postsSlice.actions;

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;