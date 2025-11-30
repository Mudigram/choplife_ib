"use client";

import { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

type StatCardProps = {
    title: string;
    value: number | string;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color?: "orange" | "yellow" | "blue" | "green" | "red";
    alert?: boolean;
};

const colorClasses = {
    orange: "text-chop-accent-cta bg-chop-accent-cta/10",
    yellow: "text-chop-accent-point bg-chop-accent-point/10",
    blue: "text-blue-400 bg-blue-400/10",
    green: "text-green-400 bg-green-400/10",
    red: "text-red-400 bg-red-400/10",
};

export default function StatCard({
    title,
    value,
    icon: Icon,
    trend,
    color = "orange",
    alert = false
}: StatCardProps) {
    return (
        <div className={`
            bg-white/5 border rounded-xl p-6
            transition-all duration-200 hover:bg-white/10
            ${alert ? "border-red-500/50" : "border-white/10"}
        `}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-chop-text-subtle text-sm font-medium mb-2">
                        {title}
                    </p>
                    <p className="text-3xl font-bold text-chop-text-light">
                        {typeof value === "number" ? value.toLocaleString() : value}
                    </p>

                    {trend && (
                        <div className={`flex items-center gap-1 mt-2 text-sm ${trend.isPositive ? "text-green-400" : "text-red-400"
                            }`}>
                            {trend.isPositive ? (
                                <TrendingUp size={16} />
                            ) : (
                                <TrendingDown size={16} />
                            )}
                            <span>{trend.value}% vs last month</span>
                        </div>
                    )}
                </div>

                <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
                    <Icon size={24} />
                </div>
            </div>
        </div>
    );
}
