"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { Place } from "@/types/place";

export type SortOption = "popular" | "rating" | "newest";

export function useBrowsePlaces() {
    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    
    // Filters
    const [category, setCategory] = useState<string>("all");
    const [area, setArea] = useState<string>("all");
    const [search, setSearch] = useState<string>("");
    const [sortBy, setSortBy] = useState<SortOption>("popular");

    const PAGE_SIZE = 12;

    const fetchPlaces = useCallback(async (reset = false) => {
        try {
            setLoading(true);
            const currentPage = reset ? 0 : page;
            const from = currentPage * PAGE_SIZE;
            const to = from + PAGE_SIZE - 1;

            let query = supabase
                .from("places")
                .select("*", { count: "exact" });

            // Apply filters
            if (category !== "all") {
                query = query.eq("category", category);
            }

            if (area !== "all") {
                query = query.eq("area", area);
            }

            if (search) {
                query = query.ilike("name", `%${search}%`);
            }

            // Apply sorting
            switch (sortBy) {
                case "popular":
                    query = query.order("total_reviews", { ascending: false });
                    break;
                case "rating":
                    query = query.order("average_rating", { ascending: false });
                    break;
                case "newest":
                    query = query.order("created_at", { ascending: false });
                    break;
            }

            // Pagination
            query = query.range(from, to);

            const { data, error, count } = await query;

            if (error) throw error;

            if (reset) {
                setPlaces(data || []);
                setPage(1);
            } else {
                setPlaces(prev => [...prev, ...(data || [])]);
                setPage(prev => prev + 1);
            }

            // Check if there are more results
            if (count !== null && (from + (data?.length || 0)) >= count) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }

        } catch (err) {
            console.error("Error fetching places:", err);
            setError(err instanceof Error ? err.message : "Failed to fetch places");
        } finally {
            setLoading(false);
        }
    }, [category, area, search, sortBy, page]);

    // Reset and fetch when filters change
    useEffect(() => {
        setPage(0);
        setHasMore(true);
        fetchPlaces(true);
    }, [category, area, search, sortBy]);

    const loadMore = () => {
        if (!loading && hasMore) {
            fetchPlaces(false);
        }
    };

    return {
        places,
        loading,
        error,
        hasMore,
        loadMore,
        filters: {
            category,
            setCategory,
            area,
            setArea,
            search,
            setSearch,
            sortBy,
            setSortBy
        }
    };
}
