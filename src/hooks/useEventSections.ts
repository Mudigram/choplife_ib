import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { SectionWithEvents } from "@/types/events";

export function useEventSection(sectionSlug: string) {
  const [data, setData] = useState<SectionWithEvents | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        setLoading(true);
        setError(null);

        /** 1️⃣ Fetch the section rows */
        const { data: sectionRows, error: sectionErr } = await supabase
          .from("event_sections")
          .select("event_id, priority")
          .eq("section_slug", sectionSlug)
          .order("priority", { ascending: true });

        if (sectionErr) throw sectionErr;

        if (!sectionRows || sectionRows.length === 0) {
          setData({ section: sectionSlug, events: [] });
          return;
        }

        const eventIds = sectionRows.map((s) => s.event_id);

        /** 2️⃣ Fetch the actual events */
        const { data: events, error: eventsErr } = await supabase
          .from("ibadan_events")
          .select("*")
          .in("id", eventIds);

        if (eventsErr) throw eventsErr;

        /** 3️⃣ Save final result */
        setData({
          section: sectionSlug,
          events: events ?? [],
        });
      } catch (err: any) {
        setError(err.message || "Failed to load section");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSection();
  }, [sectionSlug]);

  return { data, loading, error };
}
