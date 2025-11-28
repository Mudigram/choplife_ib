"use client";

import dynamic from "next/dynamic";
import type { ScrollItem } from "@/components/home/HorizontalScrollSection";
import type { MapItem } from "@/types/map";
import Spinner from "@/components/ui/Spinner";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl"><Spinner size="lg" message="Loading Map..." /></div>
});

type Props = {
    items: ScrollItem[];
    userLocation?: { lat: number; lng: number };
    itemType?: "place" | "event"; // Optional: specify the type of items being displayed
};

// Helper function to convert ScrollItem to MapItem
function scrollItemsToMapItems(items: ScrollItem[], defaultType: "place" | "event" = "place"): MapItem[] {
    return items
        .filter((item) => item.lat != null && item.lng != null) // Filter out items without coordinates
        .map((item) => ({
            id: item.id,
            type: defaultType,
            title: item.title,
            subtitle: item.subtitle,
            description: item.description,
            image_url: item.image_url,
            lat: item.lat!,
            lng: item.lng!,
            rating: item.rating,
            price: item.price_rating,
        }));
}

export default function MapView({ items, userLocation, itemType = "place" }: Props) {
    const mapItems = scrollItemsToMapItems(items, itemType);

    return (
        <div className="w-full h-[60vh] md:h-[500px] relative">
            <LeafletMap items={mapItems} userLocation={userLocation} />
        </div>
    );
}
