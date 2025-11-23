"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Bell, ChevronDown, MapPin, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import type { UserProfile } from "@/types/user";
import LocationSearchModal from "./LocationSearchModal";
import { Button } from "../ui/button";
import { updateUserLocation } from "@/lib/supabase/updateUserLocation";

type HomeHeaderProps = {
    user: UserProfile;
    location: string;
    onLocationChange?: (location: string, lat?: number, lon?: number) => void;
};

export default function HomeHeader({ user, location, onLocationChange }: HomeHeaderProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(location);
    const [hasNotifications, setHasNotifications] = useState(true);
    const [isUpdatingLocation, setIsUpdatingLocation] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);

    const defaultAvatar = "/assets/avatar/lisa.jpg";
    const defaultHeader = "/assets/header/header1.jpg";

    const handleLocationSelect = async (
        locationName: string,
        lat: number,
        lon: number
    ) => {
        try {
            setIsUpdatingLocation(true);
            setLocationError(null);
            setCurrentLocation(locationName);
            await updateUserLocation(locationName, lat, lon);

            // Notify parent
            if (onLocationChange) {
                onLocationChange(locationName, lat, lon);
            }

            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to update location:", error);
            setLocationError("Failed to update location. Please try again.");
        } finally {
            setIsUpdatingLocation(false);
        }
    };

    return (
        <header className="sticky top-0 z-20 w-full bg-chop-bg-dark rounded-b-2xl border border-white/20">
            <div className="relative w-full max-w-lg mx-auto px-6">

                {/* Background Image and Overlay */}
                <div className="absolute inset-0">
                    <Image
                        src={defaultHeader}
                        fill
                        alt="header background"
                        className="object-cover rounded-b-2xl shadow-lg"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/80 rounded-b-2xl"></div>
                </div>

                {/* Content Layer */}
                <div className="relative z-10 py-6">

                    {/* Row 1: Avatar, Location, Notification */}
                    <div className="flex items-start justify-between">

                        {/* Avatar + Greeting */}
                        <div className="flex items-center space-x-4">
                            <Link href="/profile">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-chop-accent-cta">
                                    <Image
                                        src={user.avatar_url || defaultAvatar}
                                        fill
                                        alt={`${user.username} avatar`}
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
                                disabled={isUpdatingLocation}
                                aria-label="Select location"
                                className="flex backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-3 py-1.5 items-center text-sm text-chop-accent-cta transition-colors hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <MapPin className="h-4 w-4 mr-2" />
                                <span className="truncate max-w-[120px]">{currentLocation || "Select Location"}</span>
                                <ChevronDown className="h-4 w-4 ml-2" />
                            </button>

                            {/* Notification Bell */}
                            <Link
                                href="/notifications"
                                aria-label="View notifications"
                                className="p-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-full relative transition-colors hover:bg-white/20"
                            >
                                <Bell size={20} className="text-chop-text-subtle" />
                                {hasNotifications && (
                                    <span className="absolute top-0 right-1 w-3 h-3 bg-chop-accent-cta rounded-full animate-pulse"></span>
                                )}
                            </Link>
                        </div>
                    </div>

                    {/* Greeting Section */}
                    <div className="mt-4">
                        <h1 className="text-xl font-semibold text-white">
                            Hi, {user.username || "Guest"}
                        </h1>
                        <p className="text-sm text-chop-text-subtle">
                            Explore food, events, vacation spots and more.
                        </p>
                        {locationError && (
                            <p className="text-xs text-red-400 mt-1">{locationError}</p>
                        )}
                    </div>

                    {/* Search Bar */}
                    <div className="mt-4">
                        <Link href="/search" className="block">
                            <div className="flex items-center gap-2 rounded-2xl backdrop-blur-2xl bg-white/10 border border-white/20 px-4 py-2 transition-colors hover:bg-white/15 cursor-text">
                                <Search className="h-4 w-4 text-zinc-400" />
                                <div className="flex-1 text-zinc-400 text-base">
                                    Explore your City
                                </div>
                                <Button
                                    variant="ghost"
                                    aria-label="Filters"
                                    className="p-1 hover:bg-white/10"
                                >
                                    <SlidersHorizontal className="h-4 w-4 text-chop-accent-cta" />
                                </Button>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Modal */}
                <LocationSearchModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onLocationSelect={handleLocationSelect}
                />
            </div>
        </header>
    );
}
