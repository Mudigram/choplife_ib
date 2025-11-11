import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "@/lib/supabase/supabaseClient";
import { setUser } from "@/redux/slices/userSlice";
import type { RootState } from "@/redux/store";

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

export function useUserData(userId: string) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (!userId) return;

    // 🔹 Fetch user data initially
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();
      if (data && data.id) {
        dispatch(setUser(data as User));
      }
      if (error) console.error("Error fetching user:", error);
    };

    fetchUser();

    // 🔹 Real-time subscription for changes
    const channel = supabase
      .channel("realtime-user")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "users",
          filter: `id=eq.${userId}`,
        },
        (payload) => {
          if (
            payload.new &&
            typeof payload.new === "object" &&
            "id" in payload.new
          ) {
            dispatch(setUser(payload.new as User));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, dispatch]);

  return user;
}
