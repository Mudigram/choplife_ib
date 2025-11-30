import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export type AnalyticsStats = {
    totalUsers: number;
    totalPlaces: number;
    totalReviews: number;
    totalEvents: number;
};

export type GrowthData = {
    date: string;
    users: number;
    reviews: number;
};

export type CategoryData = {
    name: string;
    value: number;
    color: string;
};

export type TopPlace = {
    id: string;
    name: string;
    rating: number;
    review_count: number;
    image_url: string | null;
};

export function useAdminAnalytics() {
    const [stats, setStats] = useState<AnalyticsStats>({
        totalUsers: 0,
        totalPlaces: 0,
        totalReviews: 0,
        totalEvents: 0,
    });
    const [growthData, setGrowthData] = useState<GrowthData[]>([]);
    const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
    const [topPlaces, setTopPlaces] = useState<TopPlace[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    async function fetchAnalytics() {
        try {
            setLoading(true);
            setError(null);

            // 1. Fetch Counts
            const [
                { count: usersCount },
                { count: placesCount },
                { count: reviewsCount },
                { count: eventsCount },
            ] = await Promise.all([
                supabase.from("users").select("*", { count: "exact", head: true }),
                supabase.from("places").select("*", { count: "exact", head: true }),
                supabase.from("reviews").select("*", { count: "exact", head: true }),
                supabase.from("ibadan_events").select("*", { count: "exact", head: true }),
            ]);

            setStats({
                totalUsers: usersCount || 0,
                totalPlaces: placesCount || 0,
                totalReviews: reviewsCount || 0,
                totalEvents: eventsCount || 0,
            });

            // 2. Fetch Growth Data (Last 30 Days) - Simplified Simulation for MVP
            // In a real app, you'd use a Postgres function or group by date in SQL.
            // Here we'll fetch recent users and reviews and aggregate them in JS.
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            
            const { data: recentUsers } = await supabase
                .from("users")
                .select("created_at")
                .gte("created_at", thirtyDaysAgo.toISOString());

            const { data: recentReviews } = await supabase
                .from("reviews")
                .select("created_at")
                .gte("created_at", thirtyDaysAgo.toISOString());

            // Aggregate by date
            const growthMap = new Map<string, { users: number; reviews: number }>();
            
            // Initialize last 30 days
            for (let i = 0; i < 30; i++) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                const dateStr = d.toISOString().split("T")[0];
                growthMap.set(dateStr, { users: 0, reviews: 0 });
            }

            recentUsers?.forEach(u => {
                const date = u.created_at.split("T")[0];
                if (growthMap.has(date)) {
                    growthMap.get(date)!.users++;
                }
            });

            recentReviews?.forEach(r => {
                const date = r.created_at.split("T")[0];
                if (growthMap.has(date)) {
                    growthMap.get(date)!.reviews++;
                }
            });

            const sortedGrowth = Array.from(growthMap.entries())
                .map(([date, counts]) => ({
                    date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                    ...counts
                }))
                .reverse();

            setGrowthData(sortedGrowth);

            // 3. Fetch Category Distribution
            // We'll fetch all places and count categories locally for now (efficient enough for < 1000 places)
            const { data: places } = await supabase.from("places").select("category");
            
            const categoryCounts: Record<string, number> = {};
            places?.forEach(p => {
                const cat = p.category || "Uncategorized";
                categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
            });

            const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F"];
            const formattedCategories = Object.entries(categoryCounts)
                .map(([name, value], index) => ({
                    name,
                    value,
                    color: COLORS[index % COLORS.length]
                }))
                .sort((a, b) => b.value - a.value)
                .slice(0, 6); // Top 6 categories

            setCategoryData(formattedCategories);

            // 4. Fetch Top Places
            const { data: topPlacesData } = await supabase
                .from("places")
                .select("id, name, rating, review_count, image_url")
                .order("rating", { ascending: false }) // Sort by rating first
                .order("review_count", { ascending: false }) // Then by popularity
                .limit(5);

            setTopPlaces(topPlacesData || []);

        } catch (err: any) {
            console.error("Error fetching analytics:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        stats,
        growthData,
        categoryData,
        topPlaces,
        loading,
        error,
        refetch: fetchAnalytics
    };
}
