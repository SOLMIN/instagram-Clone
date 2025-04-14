import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../constants/mockData'; // Use the shared User type

export interface UsersState {
  users: User[];
  loggedInUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loggedInUser: null,
  loading: false,
  error: null,
};

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk<User[]>('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('/api/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error: any) {
    return rejectWithValue(error.message || 'An error occurred');
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoggedInUser(state, action: PayloadAction<User>) {
      state.loggedInUser = action.payload;
    },
    clearLoggedInUser(state) {
      state.loggedInUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLoggedInUser, clearLoggedInUser } = userSlice.actions;

export default userSlice.reducer;
