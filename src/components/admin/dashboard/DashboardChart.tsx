"use client";

import { useAdminAnalytics } from "@/hooks/admin/useAdminAnalytics";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DashboardChart() {
    const { growthData, loading } = useAdminAnalytics();

    // Take last 7 days for mini chart
    const miniData = growthData.slice(0, 7).reverse(); // Assuming growthData is sorted desc, we want asc for chart? 
    // Wait, growthData in hook is sorted desc (newest first) for list, but charts usually need asc (oldest left).
    // Let's check hook: `sortedGrowth` is reversed at the end of hook logic? 
    // Hook: `.map(...).reverse()`. So it's Ascending (Oldest -> Newest).
    // So for mini chart (last 7 days), we want the LAST 7 items of the array.
    const chartData = growthData.slice(-7);

    if (loading) return <div className="h-[200px] bg-white/5 rounded-xl animate-pulse" />;

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden group h-[300px]">
            <div className="flex items-center justify-between mb-4 relative z-10">
                <div>
                    <h2 className="text-xl font-bold text-white">Weekly Growth</h2>
                    <p className="text-sm text-gray-400">New users & reviews</p>
                </div>
                <Link
                    href="/admin/analytics"
                    className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                    <ArrowRight size={20} />
                </Link>
            </div>

            <div className="h-[200px] w-full absolute bottom-0 left-0 right-0 opacity-50 group-hover:opacity-80 transition-opacity">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="miniGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#F4D03F" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#F4D03F" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Tooltip
                            contentStyle={{ backgroundColor: "#1A1A1A", border: "none", borderRadius: "8px", fontSize: "12px" }}
                            itemStyle={{ color: "#fff" }}
                            cursor={{ stroke: "rgba(255,255,255,0.1)" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="users"
                            stroke="#F4D03F"
                            fill="url(#miniGradient)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
