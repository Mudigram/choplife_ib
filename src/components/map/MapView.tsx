"use client";

import dynamic from "next/dynamic";
import type { ScrollItem } from "@/components/home/HorizontalScrollSection";
import Spinner from "@/components/ui/Spinner";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl"><Spinner size="lg" message="Loading Map..." /></div>
});

type Props = {
    items: ScrollItem[];
    userLocation?: { lat: number; lng: number };
};

export default function MapView(props: Props) {
    return (
        <div className="w-full h-[60vh] md:h-[500px] relative">
            <LeafletMap {...props} />
        </div>
    );
}
