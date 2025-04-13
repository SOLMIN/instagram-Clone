import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: string;
  username: string;
  avatar: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
}

const initialState: UserState = {
  id: '',
  username: '',
  avatar: '',
  name: '',
  bio: '',
  followers: 0,
  following: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return action.payload;
    },
    clearUser() {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;