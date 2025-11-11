"use server";

import { supabase } from "@/lib/supabase/supabaseClient";

export async function getUserOverview(userId: string) {
  // 1️⃣ Fetch user base info
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id, full_name, tags, total_points, created_at")
    .eq("id", userId)
    .single();

  if (userError) throw userError;

  // 2️⃣ Count user's reviews
  const { count: reviewsCount } = await supabase
    .from("reviews")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  // 3️⃣ Count user's favorites
  const { count: favoritesCount } = await supabase
    .from("favorites")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  // 4️⃣ Combine all data
  return {
    ...user,
    reviews_count: reviewsCount || 0,
    favorites_count: favoritesCount || 0,
  };
}
