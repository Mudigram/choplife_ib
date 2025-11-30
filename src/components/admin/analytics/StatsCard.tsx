import { LucideIcon } from "lucide-react";

type StatsCardProps = {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    color?: string;
};

export default function StatsCard({ title, value, icon: Icon, trend, trendUp, color = "text-chop-accent-cta" }: StatsCardProps) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors group">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-white/5 ${color} group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                </div>
                {trend && (
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${trendUp ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                        }`}>
                        {trend}
                    </span>
                )}
            </div>
            <div>
                <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-white">{value}</h3>
            </div>
        </div>
    );
}
