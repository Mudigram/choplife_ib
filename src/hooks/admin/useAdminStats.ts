import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export type ActivityItem = {
    id: string;
    type: "review" | "user_signup" | "event_created";
    title: string;
    subtitle?: string;
    date: string;
    status?: string;
    image_url?: string | null;
};

type AdminStats = {
    totalPlaces: number;
    totalEvents: number;
    totalUsers: number;
    pendingReviews: number;
    approvedReviews: number;
    rejectedReviews: number;
    recentActivity: ActivityItem[];
};

export function useAdminStats() {
    const [stats, setStats] = useState<AdminStats>({
        totalPlaces: 0,
        totalEvents: 0,
        totalUsers: 0,
        pendingReviews: 0,
        approvedReviews: 0,
        rejectedReviews: 0,
        recentActivity: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchStats() {
            try {
                setLoading(true);

                // 1. Fetch Counts
                const [placesRes, eventsRes, usersRes, reviewsRes] = await Promise.all([
                    supabase.from("places").select("id", { count: "exact", head: true }), // Fixed table name
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

                // 2. Fetch Recent Activity (Fetch more for client-side pagination)
                const { data: recentReviews } = await supabase
                    .from("reviews")
                    .select("id, created_at, status, comment, user:users(username, avatar_url), place:places(name)")
                    .order("created_at", { ascending: false })
                    .limit(50);

                const { data: recentUsers } = await supabase
                    .from("users")
                    .select("id, created_at, username, avatar_url")
                    .order("created_at", { ascending: false })
                    .limit(50);

                // Combine and format activity
                const activities: ActivityItem[] = [];

                recentReviews?.forEach((r: any) => {
                    activities.push({
                        id: r.id,
                        type: "review",
                        title: `Review by ${r.user?.username || "Unknown"}`,
                        subtitle: r.place?.name || "Unknown Place",
                        date: r.created_at,
                        status: r.status,
                        image_url: r.user?.avatar_url
                    });
                });

                recentUsers?.forEach((u: any) => {
                    activities.push({
                        id: u.id,
                        type: "user_signup",
                        title: "New User Signup",
                        subtitle: u.username,
                        date: u.created_at,
                        image_url: u.avatar_url
                    });
                });

                // Sort by date desc
                activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                setStats({
                    totalPlaces: placesRes.count || 0,
                    totalEvents: eventsRes.count || 0,
                    totalUsers: usersRes.count || 0,
                    pendingReviews: reviewCounts.pending,
                    approvedReviews: reviewCounts.approved,
                    rejectedReviews: reviewCounts.rejected,
                    recentActivity: activities, // Pass all for client-side pagination
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
