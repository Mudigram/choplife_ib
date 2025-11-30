"use client";

import { GrowthData } from "@/hooks/admin/useAdminAnalytics";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type GrowthChartProps = {
    data: GrowthData[];
};

export default function GrowthChart({ data }: GrowthChartProps) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-[400px]">
            <h3 className="text-lg font-bold text-white mb-6">Growth Trends (Last 30 Days)</h3>
            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#F4D03F" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#F4D03F" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke="#9CA3AF"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#9CA3AF"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#1A1A1A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                            itemStyle={{ color: "#fff" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="users"
                            name="New Users"
                            stroke="#F4D03F"
                            fillOpacity={1}
                            fill="url(#colorUsers)"
                            strokeWidth={3}
                        />
                        <Area
                            type="monotone"
                            dataKey="reviews"
                            name="New Reviews"
                            stroke="#4ECDC4"
                            fillOpacity={1}
                            fill="url(#colorReviews)"
                            strokeWidth={3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
