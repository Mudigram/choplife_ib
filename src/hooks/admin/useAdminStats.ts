import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

type AdminStats = {
    totalPlaces: number;
    totalEvents: number;
    totalUsers: number;
    pendingReviews: number;
    approvedReviews: number;
    rejectedReviews: number;
};

export function useAdminStats() {
    const [stats, setStats] = useState<AdminStats>({
        totalPlaces: 0,
        totalEvents: 0,
        totalUsers: 0,
        pendingReviews: 0,
        approvedReviews: 0,
        rejectedReviews: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchStats() {
            try {
                setLoading(true);

                // Fetch all stats in parallel
                const [placesRes, eventsRes, usersRes, reviewsRes] = await Promise.all([
                    supabase.from("ibadan_places").select("id", { count: "exact", head: true }),
                    supabase.from("ibadan_events").select("id", { count: "exact", head: true }),
                    supabase.from("users").select("id", { count: "exact", head: true }),
                    supabase.from("reviews").select("status"),
                ]);

                // Count review statuses
                const reviewCounts = {
                    pending: 0,
                    approved: 0,
                    rejected: 0,
                };

                reviewsRes.data?.forEach((review) => {
                    if (review.status === "pending") reviewCounts.pending++;
                    else if (review.status === "approved") reviewCounts.approved++;
                    else if (review.status === "rejected") reviewCounts.rejected++;
                });

                setStats({
                    totalPlaces: placesRes.count || 0,
                    totalEvents: eventsRes.count || 0,
                    totalUsers: usersRes.count || 0,
                    pendingReviews: reviewCounts.pending,
                    approvedReviews: reviewCounts.approved,
                    rejectedReviews: reviewCounts.rejected,
                });
            } catch (err: any) {
                console.error("Error fetching admin stats:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    return { stats, loading, error };
}
