"use client";

import dynamic from "next/dynamic";
import MapSkeleton from "@/components/ui/MapSkeleton";

// Lazy load the LeafletMap component
const LeafletMapComponent = dynamic(
    () => import("./LeafletMap"),
    {
        loading: () => <MapSkeleton />,
        ssr: false, // Leaflet doesn't work with SSR
    }
);

export default LeafletMapComponent;
