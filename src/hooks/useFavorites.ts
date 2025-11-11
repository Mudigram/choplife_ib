import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { Favorites } from "@/types/favorites";
import type { Place } from "@/types/place";

// Extended type that includes place data
export type FavoriteWithPlace = Favorites & {
  place?: Place;
};

export function useFavorites(userId: string | undefined) {
  const [favorites, setFavorites] = useState<FavoriteWithPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch favorites with joined place data
        const { data, error: fetchError } = await supabase
          .from("favorites")
          .select(
            `
            *,
            place:places(*)
          `
          )
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (fetchError) {
          console.error("Error fetching favorites:", fetchError);
          setError(fetchError.message);
          setFavorites([]);
        } else {
          // Transform the data to match our type
          // Supabase returns place as an object or array when using foreign key relationships
          type SupabaseFavoriteResponse = Favorites & {
            place?: Place | Place[] | null;
          };

          const favoritesWithPlaces: FavoriteWithPlace[] = (data || []).map(
            (fav: SupabaseFavoriteResponse) => ({
              id: fav.id,
              user_id: fav.user_id,
              place_id: fav.place_id,
              created_at: fav.created_at,
              place: Array.isArray(fav.place)
                ? fav.place[0] || undefined
                : fav.place || undefined,
            })
          );
          setFavorites(favoritesWithPlaces);
        }
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch favorites"
        );
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  return { favorites, loading, error };
}
