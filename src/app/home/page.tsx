"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import IBSpotlight from "@/components/home/Spotlight";
import HomeHeader from "@/components/home/Header";
import CategoryFilterBar from "@/components/home/CategoryFilterBar";
import { useProfile } from "@/hooks/useProfile";
import { reverseGeocode } from "@/lib/location";
import { UserProfile } from "@/types/user";

export default function HomePage() {
    const user = useSelector((state: RootState) => state.auth.user);
    const { profile, loading } = useProfile(user?.id);
    const router = useRouter();

    const [locationName, setLocationName] = useState("Click for Location");
    const [coords, setCoords] = useState<{ lat?: number; lng?: number }>({});

    useEffect(() => {
        if (!user) router.push("/login");
    }, [user, router]);

    // Handle location updates
    const handleLocationChange = async (name: string, lat?: number, lng?: number) => {
        setCoords({ lat, lng });

        if (lat && lng) {
            const real = await reverseGeocode(lat, lng);
            setLocationName(real);
        } else {
            setLocationName(name);
        }
    };

    if (loading || !user) {
        return (
            <div className="w-full min-h-screen bg-chop-bg-dark text-center p-6">
                <Spinner size="lg" message="Loading HomePage" full />
            </div>
        );
    }

    const fallbackProfile: UserProfile = {
        id: user.id,
        username: user.user_metadata?.username || user.email?.split("@")[0],
        avatar_url: user.user_metadata?.avatar_url,
    };

    const profileData = profile || fallbackProfile;

    return (
        <div className="bg-chop-bg-dark min-h-screen">

            <HomeHeader
                user={profileData}
                location={locationName}
            />

            <IBSpotlight
                userName="Mudi"
                userLocation="Lekki Phase 1" />
            <div className="p-4 max-w-lg mx-auto">
                <CategoryFilterBar onFilterSelect={(id) => console.log(id)} />
            </div>

        </div>
    );
}
