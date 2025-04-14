import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/userSlice';
import postReducer from '../slice/postSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;