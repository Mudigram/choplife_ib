"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Bell, Navigation } from "lucide-react";
import { useState } from "react";
import type { UserProfile } from "@/types/user";
import LocationSearchModal from "./LocationSearchModal";

type HomeHeaderProps = {
    user: UserProfile;
    location: string;
};

export default function HomeHeader({ user, location }: HomeHeaderProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    const defaultAvatar = "/assets/avatar/lisa.jpg";

    return (
        <header className="sticky top-0 z-20 w-full bg-chop-bg-dark p-4 shadow-lg border-b border-white/10">
            <div className="flex items-start justify-between max-w-lg mx-auto">

                {/* Avatar + Greeting */}
                <div className="flex items-center space-x-3">
                    <Link href="/profile">
                        <div className="relative w-15 h-15 rounded-full overflow-hidden border-2 border-chop-accent-cta">
                            <Image
                                src={user.avatar_url || defaultAvatar}
                                fill
                                alt="avatar"
                                className="object-cover"
                                priority
                            />
                        </div>
                    </Link>

                    <div>
                        <p className="text-sm text-chop-text-subtle">{getGreeting()},</p>
                        <h1 className="text-xl font-bold text-white">{user.username}</h1>

                        {/* Location */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center text-md text-gray-400 mt-2 hover:text-white"
                        >
                            <Navigation className="h-5 w-5 mr-2" />
                            {location || "Select Location"}
                        </button>
                    </div>
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-2 pt-2">
                    <Link href="/notifications" className="p-2 hover:bg-white/10 rounded-full">
                        <Bell size={24} className="text-white" />
                    </Link>

                    <Link href="/search" className="p-2 hover:bg-white/10 rounded-full">
                        <Search size={24} className="text-white" />
                    </Link>
                </div>
            </div>

            {/* Modal */}
            <LocationSearchModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onLocationSelect={(location) => {
                    console.log("Selected:", location);
                }}
            />

        </header>
    );
}
