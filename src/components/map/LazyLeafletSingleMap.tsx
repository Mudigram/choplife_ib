"use client";

import dynamic from "next/dynamic";
import MapSkeleton from "@/components/ui/MapSkeleton";

// Lazy load the LeafletSingleMap component
const LeafletSingleMapComponent = dynamic(
    () => import("./LeafletSingleMap"),
    {
        loading: () => <MapSkeleton />,
        ssr: false, // Leaflet doesn't work with SSR
    }
);

export default LeafletSingleMapComponent;
