"use client";

import { useAdminStats } from "@/hooks/admin/useAdminStats";
import StatCard from "@/components/admin/dashboard/StatCard";
import { Users, MapPin, Calendar, MessageSquare } from "lucide-react";

export default function AdminDashboard() {
    const { stats, loading } = useAdminStats();

    if (loading) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-chop-text-light">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-32 bg-white/5 rounded-xl animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-chop-text-light">Dashboard</h1>
                <p className="text-chop-text-subtle mt-1">Welcome to ChopLife Admin</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Places"
                    value={stats.totalPlaces}
                    icon={MapPin}
                    trend={{ value: 12, isPositive: true }}
                    color="orange"
                />
                <StatCard
                    title="Total Events"
                    value={stats.totalEvents}
                    icon={Calendar}
                    trend={{ value: 8, isPositive: true }}
                    color="yellow"
                />
                <StatCard
                    title="Pending Reviews"
                    value={stats.pendingReviews}
                    icon={MessageSquare}
                    color="blue"
                    alert={stats.pendingReviews > 0}
                />
                <StatCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={Users}
                    trend={{ value: 24, isPositive: true }}
                    color="green"
                />
            </div>

            {/* Charts Section - Coming Soon */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-chop-text-light mb-4">
                        User Growth
                    </h2>
                    <div className="h-64 flex items-center justify-center text-chop-text-subtle">
                        Chart coming soon...
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-chop-text-light mb-4">
                        Review Activity
                    </h2>
                    <div className="h-64 flex items-center justify-center text-chop-text-subtle">
                        Chart coming soon...
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-chop-text-light mb-4">
                    Recent Activity
                </h2>
                <div className="text-chop-text-subtle text-center py-8">
                    Activity feed coming soon...
                </div>
            </div>
        </div>
    );
}
