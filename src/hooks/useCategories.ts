import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        // fetch category column for all rows then dedupe client-side
        const { data, error } = await supabase
          .from("ibadan_events")
          .select("category")
          .not("category", "is", null);

        if (error) throw error;

        const cats = Array.from(
          new Set(
            (data || [])
              .map((r: any) => (r.category || "").trim())
              .filter(Boolean)
          )
        );

        setCategories(cats);
      } catch (err: any) {
        setError(err.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { categories, loading, error };
}
