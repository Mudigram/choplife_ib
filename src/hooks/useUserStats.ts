import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/supabaseClient";

interface UserStats {
  reviews_count: number;
  favorites_count: number;
  total_points: number;
  tags: string[];
  created_at: string;
}

async function fetchUserStats(userId: string): Promise<UserStats> {
  // Fetch user profile data
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("total_points, tags, created_at")
    .eq("id", userId)
    .single();

  if (userError) {
    console.error("Error fetching user data:", userError);
  }

  // Fetch reviews count
  const { count: reviewsCount, error: reviewsError } = await supabase
    .from("reviews")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (reviewsError) {
    console.error("Error fetching reviews count:", reviewsError);
  }

  // Fetch favorites count (from favorites table)
  const { count: favoritesCount, error: favoritesError } = await supabase
    .from("favorites")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (favoritesError) {
    console.error("Error fetching favorites count:", favoritesError);
  }

  return {
    reviews_count: reviewsCount || 0,
    favorites_count: favoritesCount || 0,
    total_points: userData?.total_points || 0,
    tags: userData?.tags || [],
    created_at: userData?.created_at || new Date().toISOString(),
  };
}

export function useUserStats(userId: string | undefined) {
  return useQuery({
    queryKey: ["userStats", userId],
    queryFn: () => fetchUserStats(userId!),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
