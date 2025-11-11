import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/supabaseClient";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logoutUser: (state) => {
      supabase.auth.signOut();
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { setUser, clearUser, setLoading, setError, logoutUser } =
  authSlice.actions;
export default authSlice.reducer;
