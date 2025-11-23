"use client";

import { useParams } from "next/navigation";
import Header from "@/components/places/Header";
import { usePlace } from "@/hooks/usePlace";
import InfoSection from "@/components/places/InfoSection";
import PlaceTabs from "@/components/places/PlacesTabs";

export default function PlacePage() {
    const params = useParams();
    const placeId = params?.id as string | undefined;

    const { place, loading, error } = usePlace(placeId);

    if (loading) return <div className="p-6">Loading…</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;
    if (!place || !placeId) return <div className="p-6">Place not found</div>;

    return (
        <div className="">
            <div className="">
                <Header place={place} />
                <InfoSection place={place} />
            </div>
            <PlaceTabs place={place} placeId={placeId} />
        </div>
    );
}
