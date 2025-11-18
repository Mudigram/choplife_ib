"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Bell, ChevronDown, MapPin, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import type { UserProfile } from "@/types/user";
import LocationSearchModal from "./LocationSearchModal";
import { Button } from "../ui/button";

type HomeHeaderProps = {
    user: UserProfile;
    location: string;
};

export default function HomeHeader({ user, location }: HomeHeaderProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const defaultAvatar = "/assets/avatar/lisa.jpg";
    const defaultHeader = "/assets/header/header1.jpg";
    const [notifications, activeNotification] = useState(true);





    return (
        <header className="sticky top-0 z-20 w-full bg-chop-bg-dark rounded-b-2xl border border-white/20">
            {/* Main container with relative positioning */}
            <div className="relative w-full max-w-lg mx-auto px-6">

                {/* Background Image and Overlay - should be positioned absolutely 
                    within the relative parent, and placed *first* in the JSX. */}
                <div className="absolute inset-0">
                    <Image
                        src={defaultHeader}
                        fill
                        alt="header background"
                        className="object-cover rounded-b-2xl shadow-lg "
                        priority
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black opacity-80 rounded-b-2xl"></div>
                </div>

                {/* CONTENT LAYER - This is the main content, which now needs padding
                    and high Z-index to sit on top of the absolute background elements. */}
                <div className="relative z-10 py-6">

                    {/* Row 1: Avatar, Location, Notification */}
                    <div className="flex items-start justify-between">

                        {/* Avatar + Greeting Container */}
                        <div className="flex items-center space-x-4">
                            <Link href="/profile">
                                {/* Avatar */}
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-chop-accent-cta">
                                    <Image
                                        src={user.avatar_url || defaultAvatar}
                                        fill
                                        alt="avatar"
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </Link>


                        </div>

                        {/* Location and Notification Buttons */}
                        <div className="flex items-center space-x-2">

                            {/* Location Button */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-3 py-1.5 items-center text-sm text-chop-accent-cta transition-colors hover:bg-white/20"
                            >
                                <MapPin className="h-4 w-4 mr-2" />
                                <span className="">{location || "Select Location"}</span>
                                <ChevronDown className="h-4 w-4 ml-2" />
                            </button>

                            {/* Notification Bell */}
                            <Link href="/notifications" className="p-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-full relative transition-colors hover:bg-white/20">
                                <Bell size={20} className="text-chop-text-subtle" />
                                {/* Notification Dot (optional) */}
                                {notifications && (
                                    <span className="absolute top-0 right-1 w-3 h-3 bg-chop-accent-cta rounded-full"></span>
                                )}
                            </Link>
                        </div>
                    </div>

                    <div className=" mt-4"> {/* Optional: Hide on small screens to save space */}
                        <h1 className="text-xl font-semibold text-white">Hi, {user.username}</h1>
                        <p className="text-sm text-chop-text-subtle">Discover what is happening around you</p>
                    </div>

                    {/* Search Bar - Separated for better layout control */}
                    <div className="mt-4">
                        <div className="flex items-center gap-2 rounded-2xl backdrop-blur-2xl bg-white/10 border border-white/20 px-4 py-2">
                            <Search className="h-4 w-4 text-zinc-400" />
                            <input
                                placeholder="Explore your City"
                                className="flex-1 bg-transparent outline-none text-chop-text-light placeholder-zinc-400"
                                style={{ fontSize: "16px" }}
                            />
                            <Button variant="ghost" aria-label="Filters" className="p-1">
                                <SlidersHorizontal className="h-4 w-4 text-chop-accent-cta" />
                            </Button>
                        </div>
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
            </div>
        </header>
    );
}
