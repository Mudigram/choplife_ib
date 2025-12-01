import Link from "next/link";
import { Plus, CheckSquare, Users, BarChart2 } from "lucide-react";

export default function QuickActions() {
    const actions = [
        {
            label: "Add Place",
            href: "/admin/places",
            icon: Plus,
            color: "text-orange-400",
            bg: "bg-orange-500/10",
            border: "border-orange-500/20"
        },
        {
            label: "Add Event",
            href: "/admin/events",
            icon: Plus,
            color: "text-pink-400",
            bg: "bg-pink-500/10",
            border: "border-pink-500/20"
        },
        {
            label: "Review Pending",
            href: "/admin/reviews?status=pending",
            icon: CheckSquare,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        },
        {
            label: "View Analytics",
            href: "/admin/analytics",
            icon: BarChart2,
            color: "text-green-400",
            bg: "bg-green-500/10",
            border: "border-green-500/20"
        }
    ];

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
                {actions.map((action) => (
                    <Link
                        key={action.label}
                        href={action.href}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all hover:scale-105 ${action.bg} ${action.border}`}
                    >
                        <action.icon className={`w-6 h-6 mb-2 ${action.color}`} />
                        <span className="text-sm font-medium text-white">{action.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
