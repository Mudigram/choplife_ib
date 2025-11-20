// src/hooks/useReviews.ts
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export type Review = {
  id: string;
  place_id: string;
  user_id?: string | null;
  username?: string | null;
  avatar_url?: string | null;
  comment?: string | null;
  rating: number;
  likes_count: number;
  body?: string | null; // mapped from comment
  created_at?: string | null;
  photo_url?: string | null;
  helpful_count?: number | null; // mapped from likes_count
  is_verified?: boolean | null;
  is_anonymous?: boolean | null;
};

type UseReviewsOpts = {
  placeId: string | undefined;
  pageSize?: number;
  initial?: Review[];
};

export default function useReviews({
  placeId,
  pageSize = 8,
  initial = [],
}: UseReviewsOpts) {
  const [reviews, setReviews] = useState<Review[]>(initial ?? []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const cursorRef = useRef<string | null>(null);

  const fetchPage = useCallback(async () => {
    if (!placeId || loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const query = supabase
        .from("reviews")
        .select(
          `
          id,
          place_id,
          user_id,
          rating,
          comment,
          created_at,
          photo_url,
          likes_count,
          is_verified,
          likes_count,
          is_anonymous,
          users:user_id (username, avatar_url)
        `
        )
        .eq("place_id", placeId)
        .order("created_at", { ascending: false })
        .limit(pageSize);

      // Cursor pagination
      if (cursorRef.current) {
        query.lt("created_at", cursorRef.current);
      }

      const { data, error } = await query;

      if (error) throw error;

      if (!data || data.length === 0) {
        setHasMore(false);
        return;
      }

      // Update cursor
      cursorRef.current = data[data.length - 1].created_at ?? null;

      // Transform into clean Review format
      const mapped = data.map((r: any) => ({
        id: r.id,
        place_id: r.place_id,
        user_id: r.user_id,
        username: r.users?.username ?? null,
        avatar_url: r.users?.avatar_url ?? null,
        rating: r.rating,
        likes_count: r.likes_count,
        body: r.comment, // rename
        created_at: r.created_at,
        photo_url: r.photo_url,
        comment: r.comment,
        helpful_count: r.likes_count, // rename
        is_verified: r.is_verified,
        is_anonymous: r.is_anonymous,
      }));

      setReviews((prev) => [...prev, ...mapped]);

      if (data.length < pageSize) setHasMore(false);
    } catch (err: any) {
      setError(err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }, [placeId, pageSize, loading, hasMore]);

  // Reset on place change
  useEffect(() => {
    setReviews(initial ?? []);
    cursorRef.current = null;
    setHasMore(true);
    setError(null);
  }, [placeId]);

  // Manual refresh
  const refresh = useCallback(async () => {
    setReviews([]);
    cursorRef.current = null;
    setHasMore(true);
    await fetchPage();
  }, [fetchPage]);

  return {
    reviews,
    setReviews,
    loading,
    error,
    fetchNext: fetchPage,
    hasMore,
    refresh,
  };
}
