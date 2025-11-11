"use client";

import { useState } from "react";
import { Star, User, Settings } from "lucide-react";
import OverviewTab from "./tabs/OverviewTab";
import FavoritesTab from "./tabs/FavoritesTab";
import SettingsTab from "./tabs/SettingsTab";
import type { UserProfile } from "@/types/user";
import { useUserData } from "@/hooks/useUserData";

type ProfileTabsProps = {
    user: Partial<UserProfile> & { id: string };
    onTabChange?: (tab: string) => void;
};

export default function ProfileTabs({ user, onTabChange }: ProfileTabsProps) {
    const [activeTab, setActiveTab] = useState("overview");
    const userData = useUserData(user.id);

    const tabs = [
        { id: "overview", label: "Overview", icon: User },
        { id: "favorites", label: "Favorites", icon: Star },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    const handleTabClick = (id: string) => {
        setActiveTab(id);
        onTabChange?.(id);
    };

    return (
        <div className="w-full">
            <div className="flex justify-around border-b sticky top-62 z-10 bg-chop-bg-dark border-white/10">
                {tabs.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => handleTabClick(id)}
                        className={`flex flex-col items-center justify-center py-3 px-6 w-full transition-colors ${activeTab === id
                            ? "text-chop-text-light border-b-2 border-chop-accent-point"
                            : "text-chop-text-subtle hover:text-chop-text-light"
                            }`}
                    >
                        <Icon
                            size={20}
                            className={`mb-1 ${activeTab === id ? "text-chop-accent-point" : "text-chop-text-subtle"
                                }`}
                        />
                        <span className="text-xs font-medium">{label}</span>
                    </button>
                ))}
            </div>

            {/* Active Tab Content */}
            <div className="mt-4">
                {activeTab === "overview" && <OverviewTab user={userData || {}} />}
                {activeTab === "favorites" && <FavoritesTab userId={user.id} />}
                {activeTab === "settings" && <SettingsTab user={user} />}
            </div>
        </div>
    );
}
