import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string;
  username: string;
  avatar: string;
}

const initialState: UserState = {
  id: '1',
  username: 'john_doe',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;