import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage as the default storage
import userReducer from '../slice/userSlice';
import sessionStorage from 'redux-persist/lib/storage/session';
import postReducer from '../slice/postSlice';
import { combineReducers } from 'redux';

// Combine reducers
const rootReducer = combineReducers({
  users: userReducer,
  posts: postReducer,
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: sessionStorage, // Use session storage,
  whitelist: ['users'],
  blacklist: ['posts'],
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

export const persistor = persistStore(store); // Create the persistor

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;