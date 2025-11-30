"use client";

import { useAppSelector } from "@/redux/store";
import { Bell, Search } from "lucide-react";

export default function AdminHeader() {
    const { user } = useAppSelector((state) => state.auth);

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-[#111111] border-b border-white/10 z-50">
            <div className="h-full px-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="text-2xl font-black text-chop-accent-cta">
                        ChopLife
                    </div>
                    <span className="text-sm text-chop-text-subtle font-medium">
                        Admin
                    </span>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-xl mx-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-chop-text-subtle" size={18} />
                        <input
                            type="text"
                            placeholder="Search places, events, users..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-chop-text-light placeholder:text-chop-text-subtle focus:outline-none focus:border-chop-accent-cta/50 transition-colors"
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <Bell size={20} className="text-chop-text-subtle" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </button>

                    {/* User Profile */}
                    <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                        <div className="text-right">
                            <div className="text-sm font-medium text-chop-text-light">
                                {user?.user_metadata?.username || "Admin"}
                            </div>
                            <div className="text-xs text-chop-text-subtle">
                                Administrator
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-chop-accent-cta flex items-center justify-center text-black font-bold">
                            {user?.user_metadata?.username?.[0]?.toUpperCase() || "A"}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
