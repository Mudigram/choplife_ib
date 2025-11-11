import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  full_name?: string;
  username?: string;
  avatar_url?: string;
  bio?: string;
  is_verified?: boolean;
  tags?: string[];
  total_points?: number;
  social_handles?: Record<string, string>;
  created_at?: string;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    updateAvatarUrl: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.avatar_url = action.payload;
      }
    },
  },
});

export const { setUser, updateAvatarUrl } = userSlice.actions;
export default userSlice.reducer;
