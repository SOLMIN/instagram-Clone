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
    const data = await response.json();
    // console.log('API Response:', data); // Log the API response
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return data;
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
        state.users = [...action.payload]; // Replace the users array with fresh data
        // console.log('Users fetched and stored in Redux:', state.users); // Debug log
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLoggedInUser, clearLoggedInUser } = userSlice.actions;

export default userSlice.reducer;
