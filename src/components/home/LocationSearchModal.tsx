"use client";

import { useState, useEffect } from "react";
import { reverseGeocode, searchLocations } from "@/lib/location";
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

    async function handleUseMyLocation() {
        setGeoError(null);
        setGeoLoading(true);

        if (!navigator.geolocation) {
            setGeoError("Location is not supported on this device.");
            setGeoLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;

                try {
                    // Reverse geocode
                    const name = await reverseGeocode(lat, lon);

                    onLocationSelect(name, lat, lon);
                    onClose();
                } catch (e) {
                    setGeoError("Failed to get address.");
                }

                setGeoLoading(false);
            },
            (err) => {
                setGeoError("Permission denied or unavailable.");
                setGeoLoading(false);
            },
            { enableHighAccuracy: true }
        );
    }


    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white/5 border border-white/10 backdrop-blur-md p-4 w-[90%] rounded-xl shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >

                <input
                    className="w-full p-2 border rounded-xl text-chop-text-subtle"
                    placeholder="Search for a location..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <div className="mt-4 max-h-64 overflow-y-auto">
                    <button
                        onClick={handleUseMyLocation}
                        disabled={geoLoading}
                        className="flex items-center gap-2 w-full p-2 mb-3 rounded-xl bg-chop-accent-cta text-white justify-center"
                    >
                        {geoLoading ? (
                            <Loader2 className="animate-spin h-4 w-4" />
                        ) : (
                            <Navigation className="h-4 w-4" />
                        )}
                        Use My Current Location
                    </button>

                    {suggestions.map((loc) => (
                        <button
                            key={loc.place_id}
                            className="rounded-xl w-full text-left p-2 hover:bg-gray-100 text-chop-text-subtle"
                            onClick={() => {
                                onLocationSelect(loc.display_name, Number(loc.lat), Number(loc.lon));
                                onClose();
                            }}
                        >
                            {loc.display_name}
                        </button>
                    ))}
                </div>


            </div>
        </div>
    );
}
