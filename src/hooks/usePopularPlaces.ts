import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { ScrollItem } from "@/components/home/HorizontalScrollSection";

async function fetchPopularPlaces(limit: number): Promise<ScrollItem[]> {
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
    throw new Error(error.message);
  }

  // Normalize for HorizontalScroll
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

export function usePopularPlaces(limit = 12) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["places", "popular", limit],
    queryFn: () => fetchPopularPlaces(limit),
  });

  return {
    items: data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
  };
}
