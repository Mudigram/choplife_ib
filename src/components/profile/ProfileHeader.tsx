"use client";

import Image from "next/image";
import { BadgeCheck, Settings } from "lucide-react";
import type { UserProfile } from "@/types/user";
import { useRouter } from "next/navigation";

type ProfileHeaderProps = {
    user: Partial<UserProfile>;
    onEditClick?: () => void;
};

export default function ProfileHeader({ user, onEditClick }: ProfileHeaderProps) {
    const router = useRouter();
    const defaultAvatar =
        "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(user?.full_name || "User") +
        "&background=random";

    return (
        <div className="w-full sticky top-0 z-10 bg-chop-bg-dark py-6 flex flex-col items-center text-center pb-6 pt-12 ">
            {/* Avatar */}
            <div className="relative">

                <Image
                    src={user?.avatar_url || defaultAvatar}
                    alt="User Avatar"
                    width={90}
                    height={90}
                    className="rounded-full object-cover border-2 border-chop-text-light/20 shadow-md"
                />


                {/* Settings Icon */}
                <button
                    onClick={onEditClick ? onEditClick : () => router.push("/settings")}
                    className="absolute bottom-0 left-0 bg-chop-bg-dark text-chop-accent-cta rounded-full p-1.5 shadow-md hover:bg-chop-bg-dark/80 transition border border-chop-accent-cta/30 hover:border-chop-accent-cta/50"
                    title="Settings"
                >
                    <Settings size={14} />
                </button>
            </div>

            {/* Name + Verified Badge */}
            <div className="mt-3 flex items-center gap-2 justify-center">
                <h2 className="text-lg font-semibold text-chop-text-light">{user?.full_name || "Anonymous"}</h2>
                {user?.is_verified && (
                    <BadgeCheck className="text-chop-accent-status w-5 h-5" />
                )}
            </div>



            {/* Bio */}
            {user?.bio && (
                <p className="text-chop-text-subtle text-sm mt-2 max-w-[80%]">{user.bio}</p>
            )}



            {/* Points */}
            {/* <div className="mt-4 bg-chop-accent-point text-chop-bg-dark px-5 py-1 rounded-full font-semibold text-sm shadow-neon-point">
                {user?.total_points || 0} ChopCoins
            </div> */}
        </div>
    );
}
