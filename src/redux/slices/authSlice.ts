import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { UserRole } from "@/lib/auth/roles";

interface AuthState {
  user: User | null;
  role: UserRole | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  role: null,
  loading: false,
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
    setRole: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.role = null;
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
      state.role = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { setUser, setRole, clearUser, setLoading, setError, logoutUser } =
  authSlice.actions;
export default authSlice.reducer;
