"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import IBSpotlight from "@/components/home/Spotlight";
import HomeHeader from "@/components/home/Header";
import CategoryFilterBar from "@/components/home/CategoryFilterBar";
import HorizontalScrollSection from "@/components/home/HorizontalScrollSection";
import { usePlacesByCategoryArea } from "@/hooks/usePlacesByCategoryArea";
import { useProfile } from "@/hooks/useProfile";
import { reverseGeocode } from "@/lib/location";
import { usePopularPlaces } from "@/hooks/usePopularPlaces";
import { useEventSection } from "@/hooks/useEventSections";

import { useNearbyPlaces } from "@/hooks/useNearbyPlaces";
import { useCollectionPlaces } from "@/hooks/useCollectionPlaces";
import MapView from "@/components/map/MapView";
import { Map as MapIcon, List } from "lucide-react";
import { UserProfile } from "@/types/user";
import { useFavorites } from "@/hooks/useFavorites";

// ... imports

export default function HomePage() {
    const user = useSelector((state: RootState) => state.auth.user);
    const { profile, loading } = useProfile(user?.id);
    const { items, loading: popularLoading } = usePopularPlaces(12);
    const { isFavorite, toggleFavorite } = useFavorites(user?.id);

    // Fetch Events
    const { data: eventData, loading: eventsLoading } = useEventSection("hot-this-week");
    const events = eventData?.events || [];

    const router = useRouter();

    const [locationName, setLocationName] = useState("Click for Location");
    const [coords, setCoords] = useState<{ lat?: number; lng?: number }>({});
    const [area, setArea] = useState<string | null>(null);
    const [activeCollection, setActiveCollection] = useState<string | null>(null);
    const [showMap, setShowMap] = useState(false);
    const category = "food";

    useEffect(() => {
        if (!user) router.push("/login");
    }, [user, router]);

    // Initialize location from profile
    useEffect(() => {
        if (profile?.location) {
            setLocationName(profile.location);
            if (profile.latitude && profile.longitude) {
                setCoords({ lat: profile.latitude, lng: profile.longitude });
            }
        } else if ("geolocation" in navigator && !coords.lat) {
            // Only try geolocation if no profile location and no coords yet
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    handleLocationChange("Current Location", latitude, longitude);
                },
                (error) => {
                    console.log("Location access denied or error:", error);
                }
            );
        }
    }, [profile]);
    const { itemscat } = usePlacesByCategoryArea({ category, area, limit: 12 });

    // 2. Geospatial fetch (Optimal)
    const { items: nearbyItems, loading: nearbyLoading } = useNearbyPlaces(
        coords.lat,
        coords.lng,
        10 // 10km radius
    );

    // 3. Collection fetch
    const { items: collectionItems, loading: collectionLoading } = useCollectionPlaces(activeCollection);

    // Decide which items to show
    const displayItems = coords.lat && coords.lng ? nearbyItems : itemscat;
    const displayTitle = coords.lat && coords.lng
        ? "Restaurants Near You (Within 10km)"
        : (area ? `Restaurants in ${area}` : "Restaurants Near You");

    // Handle location updates
    const handleLocationChange = async (name: string, lat?: number, lng?: number) => {
        setCoords({ lat, lng });
        setArea(name); // Keep area name for UI display

        if (lat && lng) {
            const real = await reverseGeocode(lat, lng);
            setLocationName(real);
        } else {
            setLocationName(name);
        }
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    handleLocationChange("Current Location", latitude, longitude);
                },
                (error) => {
                    console.log("Location access denied or error:", error);
                }
            );
        }
    }, []);

    const fallbackProfile: UserProfile = {
        id: user?.id || "",
        username: user?.user_metadata?.username || user?.email?.split("@")[0] || "Guest",
        avatar_url: user?.user_metadata?.avatar_url,
    };

    const profileData = profile || fallbackProfile;

    // Map events to ScrollItems
    const eventItems = events.map(e => ({
        id: e.id,
        title: e.title,
        image_url: e.thumbnail,
        subtitle: e.start_date_time ? new Date(e.start_date_time).toLocaleDateString() : "Upcoming",
        description: e.description,
        rating: null,
        price_rating: null,
        lat: e.lat,
        lng: e.lng,
        isFavorite: isFavorite(e.id)
    }));

    // Map isFavorite to items
    const itemsWithFavorites = items.map(item => ({ ...item, isFavorite: isFavorite(item.id) }));
    const collectionItemsWithFavorites = collectionItems.map(item => ({ ...item, isFavorite: isFavorite(item.id) }));
    const displayItemsWithFavorites = displayItems.map(item => ({ ...item, isFavorite: isFavorite(item.id) }));

    return (
        <div className="bg-chop-bg-dark min-h-screen overflow-hidden">

            <HomeHeader
                user={profileData}
                location={locationName}
                onLocationChange={(newLoc, lat, lng) => handleLocationChange(newLoc, lat, lng)}
            />

            <IBSpotlight
                userName="Mudi"
                userLocation="Lekki Phase 1" />
            <div className="p-4 max-w-lg mx-auto">
                <CategoryFilterBar
                    selected={activeCollection}
                    onFilterSelect={(id) => setActiveCollection(id === "all" ? null : (id === activeCollection ? null : id))}
                />
            </div>

            {/* Map Toggle FAB */}
            <button
                onClick={() => setShowMap(!showMap)}
                className="fixed bottom-24 right-6 z-50 bg-chop-accent-cta text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
                {showMap ? <List size={24} /> : <MapIcon size={24} />}
                <span className="font-medium">{showMap ? "List" : "Map"}</span>
            </button>

            {showMap ? (
                <div className="p-4 h-screen pb-48">
                    <MapView
                        items={activeCollection ? collectionItems : [...eventItems, ...displayItems, ...items]}
                        userLocation={coords.lat && coords.lng ? { lat: coords.lat, lng: coords.lng } : undefined}
                    />
                </div>
            ) : (
                <>
                    {activeCollection ? (
                        // Collection View
                        <div className="min-h-[50vh]">
                            <HorizontalScrollSection
                                title={`Best for ${activeCollection.replace("_", " ")}`}
                                items={collectionItemsWithFavorites}
                                onItemClick={(item) => router.push(`/places/${item.id}`)}
                                onFavoriteToggle={(item) => toggleFavorite({ id: item.id, type: "place" })}
                            />
                            {collectionLoading && <Spinner size="lg" message="Curating..." full />}
                            {collectionItems.length === 0 && !collectionLoading && (
                                <p className="text-center text-gray-400 mt-10">No spots found for this vibe yet.</p>
                            )}
                        </div>
                    ) : (
                        // Default View
                        <>
                            {/* Events Section */}
                            <HorizontalScrollSection
                                title="Hot Events This Week 🔥"
                                items={eventItems}
                                onItemClick={(item) => router.push(`/events/${item.id}`)}
                                onFavoriteToggle={(item) => toggleFavorite({ id: item.id, type: "event" })}
                            />
                            {eventsLoading && <Spinner size="sm" message="Loading Events..." />}

                            <HorizontalScrollSection
                                title="Popular In Ibadan"
                                items={itemsWithFavorites}
                                onItemClick={(item) => router.push(`/places/${item.id}`)}
                                onFavoriteToggle={(item) => toggleFavorite({ id: item.id, type: "place" })}
                            />
                            {loading && <Spinner size="lg" message="Loading Popular Places" full />}
                            <div className="mb-4">
                                <HorizontalScrollSection
                                    title={displayTitle}
                                    items={displayItemsWithFavorites}
                                    onItemClick={(i) => router.push(`/places/${i.id}`)}
                                    onFavoriteToggle={(item) => toggleFavorite({ id: item.id, type: "place" })}
                                />
                                {nearbyLoading && <p className="text-xs text-center text-gray-500">Finding closest spots...</p>}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
