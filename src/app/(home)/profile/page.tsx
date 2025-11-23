"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { useProfile } from "@/hooks/useProfile";
import ProfileTabs from "@/components/profile/ProfileTabs";

export default function ProfilePage() {
    const user = useSelector((state: RootState) => state.auth.user);
    const { profile, loading } = useProfile(user?.id);
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("overview");

    // Redirect if no user
    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) {
        return null;
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-chop-bg-dark">
                <div className="text-chop-text-light">Loading profile...</div>
            </div>
        );
    }

    // Use profile data if available, otherwise fallback to auth user data
    const profileData = profile || {
        id: user.id,
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0],
        username: user.user_metadata?.username || user.email?.split("@")[0],
        avatar_url: user.user_metadata?.avatar_url,
        bio: user.user_metadata?.bio,
        is_verified: user.user_metadata?.is_verified,
        total_points: user.user_metadata?.total_points || 0,
        tags: user.user_metadata?.tags || [],
    };



    return (
        <div className="min-h-screen w-full bg-chop-bg-dark">
            <ProfileHeader
                user={profileData}
                onEditClick={() => setActiveTab("settings")}
            />
            <div className="w-full max-w-md mx-auto px-4">
                <ProfileTabs
                    user={profileData}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
            </div>
        </div>
    );
}
