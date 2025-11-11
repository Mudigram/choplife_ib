import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { UserProfile } from "@/types/user";

export function useProfile(userId: string | undefined) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .single();

        if (error) {
          // Profile doesn't exist or table doesn't exist - return null to use fallback
          console.log("Profile fetch error:", error.message);
          setProfile(null);
        } else {
          setProfile(data);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch profile"
        );
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return { profile, loading, error };
}
