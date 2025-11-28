"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Favorite } from "@/types/favorites";
import type { Place } from "@/types/place";
import type { IbadanEvent } from "@/types/events";

export type FavoriteWithDetails = Favorite & {
  place?: Place;
  event?: IbadanEvent;
};

export function useFavorites(userId?: string) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [favoritesWithDetails, setFavoritesWithDetails] = useState<FavoriteWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setFavorites([]);
      setFavoritesWithDetails([]);
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      setLoading(true);
      
      // Fetch basic favorites for quick isFavorite checks
      const { data: basicData } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", userId);

      if (basicData) {
        setFavorites(basicData);
        console.log("✅ Basic favorites loaded:", basicData.length);
      }

      // Fetch favorites with full details - using separate queries instead of joins
      const { data: favoritesData, error: favError } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      console.log("📊 Favorites data:", { favoritesData, favError });

      if (favError) {
        console.error("❌ Error fetching favorites:", favError);
        setLoading(false);
        return;
      }

      if (favoritesData && favoritesData.length > 0) {
        // Get all place IDs and event IDs
        const placeIds = favoritesData
          .filter(f => f.place_id)
          .map(f => f.place_id);
        const eventIds = favoritesData
          .filter(f => f.event_id)
          .map(f => f.event_id);

        // Fetch places
        let placesMap = new Map();
        if (placeIds.length > 0) {
          const { data: placesData } = await supabase
            .from("places")
            .select("*")
            .in("id", placeIds);
          
          if (placesData) {
            placesData.forEach(place => placesMap.set(place.id, place));
          }
        }

        // Fetch events
        let eventsMap = new Map();
        if (eventIds.length > 0) {
          const { data: eventsData } = await supabase
            .from("ibadan_events")
            .select("*")
            .in("id", eventIds);
          
          if (eventsData) {
            eventsData.forEach(event => eventsMap.set(event.id, event));
          }
        }

        // Combine the data
        const enriched: FavoriteWithDetails[] = favoritesData.map((fav) => ({
          id: fav.id,
          user_id: fav.user_id,
          place_id: fav.place_id,
          event_id: fav.event_id,
          created_at: fav.created_at,
          place: fav.place_id ? placesMap.get(fav.place_id) : undefined,
          event: fav.event_id ? eventsMap.get(fav.event_id) : undefined,
        }));

        console.log("✨ Enriched favorites:", enriched);
        setFavoritesWithDetails(enriched);
      }
      
      setLoading(false);
    };

    fetchFavorites();
  }, [userId]);

  const isFavorite = (id: string | number) => {
    return favorites.some((f) => f.place_id === String(id) || f.event_id === Number(id));
  };

  const toggleFavorite = async (item: { id: string | number; type: "place" | "event" }) => {
    if (!userId) return;

    const exists = favorites.find(
      (f) =>
        (item.type === "place" && f.place_id === String(item.id)) ||
        (item.type === "event" && f.event_id === Number(item.id))
    );

    // Optimistic Update
    if (exists) {
      setFavorites((prev) => prev.filter((f) => f.id !== exists.id));
      setFavoritesWithDetails((prev) => prev.filter((f) => f.id !== exists.id));
      await supabase.from("favorites").delete().eq("id", exists.id);
    } else {
      // Create temp ID for optimistic UI
      const tempId = Date.now();
      const newFav: Favorite = {
        id: tempId,
        user_id: userId,
        created_at: new Date().toISOString(),
        place_id: item.type === "place" ? String(item.id) : null,
        event_id: item.type === "event" ? Number(item.id) : null,
      };

      setFavorites((prev) => [...prev, newFav]);

      // Debug logging
      const insertData = {
        user_id: userId,
        place_id: item.type === "place" ? String(item.id) : null,
        event_id: item.type === "event" ? Number(item.id) : null,
      };
      console.log("🔍 Attempting to insert favorite:", insertData);

      const { data, error } = await supabase
        .from("favorites")
        .insert(insertData)
        .select()
        .single();

      if (error) {
        // Revert on error
        console.error("❌ Failed to insert favorite:", error);
        console.error("📊 Error details:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        setFavorites((prev) => prev.filter((f) => f.id !== tempId));
      } else if (data) {
        console.log("✅ Successfully inserted favorite:", data);
        // Replace temp ID with real ID
        setFavorites((prev) => prev.map((f) => (f.id === tempId ? data : f)));
      }
    }
  };

  return { favorites, favoritesWithDetails, loading, isFavorite, toggleFavorite };
}
