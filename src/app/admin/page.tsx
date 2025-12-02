"use client";

import { useAdminStats } from "@/hooks/admin/useAdminStats";
import StatCard from "@/components/admin/dashboard/StatCard";
import RecentActivityFeed from "@/components/admin/dashboard/RecentActivityFeed";
import QuickActions from "@/components/admin/dashboard/QuickActions";
import DashboardChart from "@/components/admin/dashboard/DashboardChart";
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
        <div className="space-y-6 pb-10">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-chop-text-light">Dashboard</h1>
                <p className="text-chop-text-subtle mt-1">Welcome back, Admin</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Places"
                    value={stats.totalPlaces}
                    icon={MapPin}
                    color="orange"
                />
                <StatCard
                    title="Total Events"
                    value={stats.totalEvents}
                    icon={Calendar}
                    color="pink"
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
                    color="green"
                />
            </div>

            {/* Main Content Stack */}
            <div className="space-y-6">
                <QuickActions />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column (2/3) - Chart & Activity */}
                    <div className="lg:col-span-2 space-y-6">
                        <DashboardChart />
                        <RecentActivityFeed activities={stats.recentActivity} />
                    </div>

                    {/* Right Column (1/3) - System Status (and maybe other widgets later) */}
                    <div className="space-y-6">
                        {/* System Status Card */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h2 className="text-lg font-bold text-white mb-4">System Status</h2>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">Database</span>
                                    <span className="text-green-400 flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-green-500" />
                                        Online
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">Storage</span>
                                    <span className="text-green-400 flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-green-500" />
                                        Healthy
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">Version</span>
                                    <span className="text-gray-300">v1.2.0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
