"use client";

import { useState, useMemo } from "react";
import { MapItem } from "@/types/map";
import LeafletMap from "@/components/map/LazyLeafletMap";
import ExploreFeed from "@/components/explore/ExploreFeed";
import FilterBar from "@/components/explore/FilterBar";
import { Map as MapIcon, List as ListIcon } from "lucide-react";

type Props = {
    initialItems: MapItem[];
};

export default function ExploreClient({ initialItems }: Props) {
    const [viewMode, setViewMode] = useState<"list" | "map">("list");
    const [activeFilter, setActiveFilter] = useState("all");

    // Filter logic
    const filteredItems = useMemo(() => {
        if (activeFilter === "all") return initialItems;
        if (activeFilter === "events") return initialItems.filter(i => i.type === "event");
        // Simple mapping for other filters - in a real app this would be more robust
        if (activeFilter === "restaurants") return initialItems.filter(i => i.type === "place" && (i.subtitle?.toLowerCase().includes("restaurant") || i.description?.toLowerCase().includes("restaurant")));
        if (activeFilter === "cafes") return initialItems.filter(i => i.type === "place" && (i.subtitle?.toLowerCase().includes("cafe") || i.description?.toLowerCase().includes("cafe")));
        if (activeFilter === "nightlife") return initialItems.filter(i => i.type === "place" && (i.subtitle?.toLowerCase().includes("lounge") || i.subtitle?.toLowerCase().includes("bar")));

        return initialItems;
    }, [initialItems, activeFilter]);

    return (
        <div className="relative min-h-screen bg-chop-bg-dark pb-20">
            {/* Header & Filter */}
            <div className="sticky top-0 z-40 bg-chop-bg-dark/80 backdrop-blur-md border-b border-white/5 pt-4 pb-2">
                <div className="px-4 mb-2 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">Explore</h1>

                    {/* Desktop View Toggle (Hidden on mobile usually, but good to have) */}
                    <div className="hidden md:flex bg-chop-bg-card rounded-lg p-1 border border-white/10">
                        <button
                            onClick={() => setViewMode("list")}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === "list" ? "bg-chop-accent-cta text-white" : "text-chop-text-subtle hover:text-white"}`}
                        >
                            List
                        </button>
                        <button
                            onClick={() => setViewMode("map")}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === "map" ? "bg-chop-accent-cta text-white" : "text-chop-text-subtle hover:text-white"}`}
                        >
                            Map
                        </button>
                    </div>
                </div>

                <FilterBar
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                />
            </div>

            {/* Content Area */}
            <div className="relative h-[calc(100vh-140px)]">
                {/* List View */}
                <div className={`${viewMode === "list" ? "block" : "hidden"} h-full overflow-y-auto`}>
                    <ExploreFeed items={filteredItems} />
                </div>

                {/* Map View */}
                <div className={`${viewMode === "map" ? "block" : "hidden"} h-full w-full absolute inset-0`}>
                    <LeafletMap items={filteredItems} className="h-full w-full" />
                </div>
            </div>

            {/* Mobile Floating Toggle Button */}
            <div className="fixed bottom-24 right-6 z-50 md:hidden">
                <button
                    onClick={() => setViewMode(prev => prev === "list" ? "map" : "list")}
                    className="flex items-center gap-2 bg-chop-accent-cta text-white px-5 py-3 rounded-full shadow-[0_4px_20px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 transition-all font-bold"
                >
                    {viewMode === "list" ? (
                        <>
                            <MapIcon size={20} />
                            <span>Map</span>
                        </>
                    ) : (
                        <>
                            <ListIcon size={20} />
                            <span>List</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
