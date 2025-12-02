"use client";

import { useState } from "react";
import { Star, User, Settings, Activity } from "lucide-react";
import OverviewTab from "./tabs/OverviewTab";
import FavoritesTab from "./tabs/FavoritesTab";
import SettingsTab from "./tabs/SettingsTab";
import ActivityTab from "./tabs/ActivityTab";
import type { UserProfile } from "@/types/user";
import { useUserData } from "@/hooks/useUserData";

type ProfileTabsProps = {
    user: Partial<UserProfile> & { id: string };
    activeTab: string;
    onTabChange: (tab: string) => void;
};

export default function ProfileTabs({ user, activeTab, onTabChange }: ProfileTabsProps) {
    const userData = useUserData(user.id);

    const tabs = [
        { id: "overview", label: "Overview", icon: User },
        { id: "activity", label: "Activity", icon: Activity },
        { id: "favorites", label: "Favorites", icon: Star },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    const handleTabClick = (id: string) => {
        onTabChange(id);
    };

    return (
        <div className="w-full">
            <div className="flex justify-around border-b sticky top-56 z-10 bg-chop-bg-dark border-white/10">
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
                {activeTab === "overview" && <OverviewTab userId={user.id} />}
                {activeTab === "activity" && <ActivityTab userId={user.id} />}
                {activeTab === "favorites" && <FavoritesTab userId={user.id} />}
                {activeTab === "settings" && <SettingsTab user={user} />}
            </div>
        </div>
    );
}
