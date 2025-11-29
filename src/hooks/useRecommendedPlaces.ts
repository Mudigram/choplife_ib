import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { ScrollItem } from "@/components/home/HorizontalScrollSection";

async function fetchRecommendedPlaces(limit: number): Promise<ScrollItem[]> {
  // In a real app, this would call an edge function or RPC that uses the user's preferences.
  // For now, we'll fetch places with high ratings as a proxy for "Recommended".
  const { data, error } = await supabase
    .from("places")
    .select(`
      id,
      name,
      image_url,
      area,
      rating,
      latitude,
      longitude
    `)
    .order("rating", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching recommended places:", error);
    throw new Error(error.message);
  }

  console.log("Recommended places data:", data);

  return (data ?? []).map((p) => ({
    id: p.id,
    title: p.name,
    subtitle: p.area || "",
    image_url: p.image_url || "",
    rating: p.rating,
    lat: p.latitude,
    lng: p.longitude,
  }));
}

export function useRecommendedPlaces(userId?: string, limit = 12) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["places", "recommended", userId, limit],
    queryFn: () => fetchRecommendedPlaces(limit),
    enabled: true,
  });

  return {
    items: data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
  };
}