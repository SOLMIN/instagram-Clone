import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Comment {
  id: string;
  text: string;
  likes: number;
}

interface Post {
  id: string;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: Comment[];
}

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [
    {
      id: '1',
      username: 'john_doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg', // Realistic avatar
      image: 'https://plus.unsplash.com/premium_photo-1663039978729-6f6775725f89?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Random nature image
      caption: 'Enjoying the beautiful outdoors!',
      likes: 15,
      comments: [
        { id: 'c1', text: 'Looks amazing!', likes: 3 },
        { id: 'c2', text: 'Wish I was there!', likes: 2 },
      ],
    },
    {
      id: '2',
      username: 'jane_doe',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg', // Realistic avatar
      image: 'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Random city image
      caption: 'City vibes!',
      likes: 20,
      comments: [
        { id: 'c3', text: 'Love the view!', likes: 5 },
        { id: 'c4', text: 'Great shot!', likes: 4 },
      ],
    },
    {
      id: '3',
      username: 'travel_guru',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg', // Realistic avatar
      image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=3751&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Random travel image
      caption: 'Exploring the world one step at a time.',
      likes: 30,
      comments: [
        { id: 'c5', text: 'Incredible journey!', likes: 8 },
        { id: 'c6', text: 'Keep inspiring us!', likes: 6 },
      ],
    },
  ],
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
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;