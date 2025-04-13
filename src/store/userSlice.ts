import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface UserState {
  id: string;
  username: string;
  avatar: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  posts: any[]; // Adjust the type if needed
}

export interface UsersState {
  username: any;
  avatar: any;
  users: UserState[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  username: undefined,
  avatar: undefined,
};

// Async thunk to fetch users using the `fetch` API
export const fetchUsers = createAsyncThunk<UserState[]>('users/fetchUsers', async () => {
  const response = await fetch('/api/users'); // Relative URL works with the proxy
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json(); // Parse and return the JSON response
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserState[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export default userSlice.reducer;
