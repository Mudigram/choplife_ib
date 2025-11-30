"use client";

import { useAdminAnalytics } from "@/hooks/admin/useAdminAnalytics";
import StatsCard from "@/components/admin/analytics/StatsCard";
import GrowthChart from "@/components/admin/analytics/GrowthChart";
import CategoryPieChart from "@/components/admin/analytics/CategoryPieChart";
import TopPlacesList from "@/components/admin/analytics/TopPlacesList";
import { Users, MapPin, Star, Calendar, RefreshCw } from "lucide-react";

export default function AnalyticsPage() {
    const { stats, growthData, categoryData, topPlaces, loading, refetch } = useAdminAnalytics();

    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-8 w-48 bg-white/10 rounded-lg" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-32 bg-white/5 rounded-xl" />
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 h-[400px] bg-white/5 rounded-xl" />
                    <div className="h-[400px] bg-white/5 rounded-xl" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-chop-text-light">Analytics Overview</h1>
                    <p className="text-chop-text-subtle mt-1">Track growth, engagement, and market trends</p>
                </div>
                <button
                    onClick={refetch}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    title="Refresh Data"
                >
                    <RefreshCw size={20} />
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Total Users"
                    value={stats.totalUsers.toLocaleString()}
                    icon={Users}
                    color="text-chop-accent-cta"
                    trend="+12% this month"
                    trendUp={true}
                />
                <StatsCard
                    title="Total Places"
                    value={stats.totalPlaces.toLocaleString()}
                    icon={MapPin}
                    color="text-purple-400"
                    trend="+5 new"
                    trendUp={true}
                />
                <StatsCard
                    title="Total Reviews"
                    value={stats.totalReviews.toLocaleString()}
                    icon={Star}
                    color="text-yellow-400"
                    trend="+8% engagement"
                    trendUp={true}
                />
                <StatsCard
                    title="Total Events"
                    value={stats.totalEvents.toLocaleString()}
                    icon={Calendar}
                    color="text-pink-400"
                    trend="Active season"
                    trendUp={true}
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Growth Chart */}
                <div className="lg:col-span-2">
                    <GrowthChart data={growthData} />
                </div>

                {/* Category Distribution */}
                <div>
                    <CategoryPieChart data={categoryData} />
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <TopPlacesList places={topPlaces} />
                </div>
                {/* Placeholder for future "Conversion" or "Revenue" metrics */}
                <div className="lg:col-span-2 bg-gradient-to-br from-chop-accent-cta/10 to-purple-500/10 border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Investor Highlights</h3>
                    <p className="text-gray-400 max-w-md">
                        "ChopLife Ibadan has captured {((stats.totalUsers / 5000) * 100).toFixed(1)}% of the target market in just 3 months, with a {((stats.totalReviews / stats.totalUsers) * 100).toFixed(0)}% user engagement rate."
                    </p>
                    <button className="mt-6 px-6 py-2 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
                        Download Report
                    </button>
                </div>
            </div>
        </div>
    );
}
