"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    MessageSquare,
    MapPin,
    Calendar,
    Users,
    BarChart3,
    Settings,
    LogOut
} from "lucide-react";

const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Reviews", href: "/admin/reviews", icon: MessageSquare, badge: "pending" },
    { name: "Places", href: "/admin/places", icon: MapPin },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-[#111111] border-r border-white/10 z-40">
            <div className="flex flex-col h-full">
                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href ||
                            (item.href !== "/admin" && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-lg
                                    transition-all duration-200
                                    ${isActive
                                        ? "bg-chop-accent-cta text-black font-semibold"
                                        : "text-chop-text-subtle hover:bg-white/5 hover:text-chop-text-light"
                                    }
                                `}
                            >
                                <Icon size={20} />
                                <span>{item.name}</span>
                                {item.badge && (
                                    <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-red-500 text-white">
                                        3
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Exit Admin */}
                <div className="p-4 border-t border-white/10">
                    <Link
                        href="/home"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-chop-text-subtle hover:bg-white/5 hover:text-chop-text-light transition-all"
                    >
                        <LogOut size={20} />
                        <span>Exit Admin</span>
                    </Link>
                </div>
            </div>
        </aside>
    );
}
