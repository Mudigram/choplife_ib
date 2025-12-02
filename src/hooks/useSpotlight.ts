import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { FeaturedSpotlight } from "@/types/spotlights";

// Fetch spotlights from Supabase
async function fetchSpotlights(): Promise<FeaturedSpotlight[]> {
  const { data, error } = await supabase
    .from("featured_spotlights")
    .select("*")
    .eq("is_active", true)
    .order("priority", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

// Save/unsave spotlight
async function toggleSpotlightSave(spotlightId: number, userId: string | undefined) {
  if (!userId) {
    throw new Error("User must be logged in to save");
  }

  // Check if already saved
  const { data: existing } = await supabase
    .from("user_saved_spotlights")
    .select("id")
    .eq("user_id", userId)
    .eq("spotlight_id", spotlightId)
    .single();

  if (existing) {
    // Unsave
    const { error } = await supabase
      .from("user_saved_spotlights")
      .delete()
      .eq("user_id", userId)
      .eq("spotlight_id", spotlightId);

    if (error) throw error;
    return { saved: false };
  } else {
    // Save
    const { error } = await supabase
      .from("user_saved_spotlights")
      .insert({ user_id: userId, spotlight_id: spotlightId });

    if (error) throw error;
    return { saved: true };
  }
}

export function useSpotlight() {
  const queryClient = useQueryClient();

  // Fetch spotlights with React Query
  const {
    data: spotlight = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["spotlights"],
    queryFn: fetchSpotlights,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 3,
  });

  // Save/unsave mutation
  const saveMutation = useMutation({
    mutationFn: ({ spotlightId, userId }: { spotlightId: number; userId: string | undefined }) =>
      toggleSpotlightSave(spotlightId, userId),
    onMutate: async ({ spotlightId }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["spotlights"] });

      // Snapshot previous value
      const previousSpotlights = queryClient.getQueryData<FeaturedSpotlight[]>(["spotlights"]);

      // Optimistically update
      queryClient.setQueryData<FeaturedSpotlight[]>(["spotlights"], (old) =>
        old?.map((s) =>
          s.id === spotlightId
            ? { ...s, save_count: (s.save_count || 0) + 1 }
            : s
        )
      );

      return { previousSpotlights };
    },
    onError: (_err, _variables, context) => {
      // Rollback on error
      if (context?.previousSpotlights) {
        queryClient.setQueryData(["spotlights"], context.previousSpotlights);
      }
    },
    onSettled: () => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: ["spotlights"] });
    },
  });

  return {
    spotlight,
    loading,
    error: error ? (error as Error).message : null,
    refetch,
    toggleSave: saveMutation.mutate,
  };
}
