"use client";

import { useState, useEffect } from "react";
import { searchLocations } from "@/lib/location";
import { X, MapPin, Navigation, Loader2 } from "lucide-react";
import type { LocationSearchModalProps, LocationSuggestion } from "@/types/location";

export default function LocationSearchModal({
    isOpen,
    onClose,
    onLocationSelect
}: LocationSearchModalProps) {

    const [query, setQuery] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [geoLoading, setGeoLoading] = useState(false);
    const [geoError, setGeoError] = useState<string | null>(null);
    const [geoData, setGeoData] = useState<GeolocationPosition | null>(null);
    const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]); // ✅ FIXED

    useEffect(() => {
        const handler = setTimeout(async () => {
            if (query.length < 2) {
                setSuggestions([]); // allowed now
                return;
            }

            const results = await searchLocations(query);
            setSuggestions(results); // allowed now
        }, 300);

        return () => clearTimeout(handler);
    }, [query]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-chop-bg-card p-4 w-[90%] rounded-xl shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >

                <input
                    className="w-full p-2 border rounded-xl text-chop-text-subtle"
                    placeholder="Search for a location..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <div className="mt-4 max-h-64 overflow-y-auto">
                    {suggestions.map((loc) => (
                        <button
                            key={loc.place_id}
                            className="block w-full text-left p-2 hover:bg-gray-100 text-chop-text-subtle"
                            onClick={() => {
                                onLocationSelect(loc.display_name, Number(loc.lat), Number(loc.lon));
                                onClose();
                            }}
                        >
                            {loc.display_name}
                        </button>
                    ))}
                </div>

                <button
                    onClick={onClose}
                    className="mt-4 ml-20 w-[50%] bg-chop-accent-cta text-white p-2 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
