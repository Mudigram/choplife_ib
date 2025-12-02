"use client";

import { useState, useEffect, useMemo } from "react";
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
import ViewAll from "@/components/home/ViewAll";
import { useNearbyPlaces } from "@/hooks/useNearbyPlaces";
import { useCollectionPlaces } from "@/hooks/useCollectionPlaces";
import MapView from "@/components/map/MapView";
import { Map as MapIcon, List, Calendar, MapPin, Store } from "lucide-react";
import { UserProfile } from "@/types/user";
import { useFavorites } from "@/hooks/useFavorites";
import EmptyState from "@/components/home/EmptyState";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";
import { RefreshCw } from "lucide-react";
import { useRecommendedPlaces } from "@/hooks/useRecommendedPlaces";

// ... imports

export default function HomePage() {
    const user = useSelector((state: RootState) => state.auth.user);
    const { profile, loading } = useProfile(user?.id);
    const { items, loading: popularLoading, error: popularError } = usePopularPlaces(12);
    const { isFavorite, toggleFavorite } = useFavorites(user?.id);
    const { items: recommendedItems, error: recommendedError } = useRecommendedPlaces(user?.id);


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

    // Consolidated location initialization - runs only once on mount
    useEffect(() => {
        // Priority 1: Use profile location if available
        if (profile?.location) {
            setLocationName(profile.location);
            if (profile.latitude && profile.longitude) {
                setCoords({ lat: profile.latitude, lng: profile.longitude });
            }
            return; // Don't request geolocation if we have profile location
        }

        // Priority 2: Fall back to browser geolocation
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setCoords({ lat: latitude, lng: longitude });
                    const locationName = await reverseGeocode(latitude, longitude);
                    setLocationName(locationName);
                    setArea(locationName);
                },
                (error) => {
                    console.log("Location access denied or error:", error);
                }
            );
        }
    }, [profile]); // Only re-run when profile changes

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

    const fallbackProfile: UserProfile = {
        id: user?.id || "",
        username: user?.user_metadata?.username || user?.email?.split("@")[0] || "Guest",
        avatar_url: user?.user_metadata?.avatar_url,
    };

    const profileData = profile || fallbackProfile;

    // Memoized transformations to prevent unnecessary recalculations
    const eventItems = useMemo(() => events.map(e => ({
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
    })), [events, isFavorite]);

    // Memoize favorite mappings for performance
    const itemsWithFavorites = useMemo(() =>
        items.map(item => ({ ...item, isFavorite: isFavorite(item.id) })),
        [items, isFavorite]
    );

    const collectionItemsWithFavorites = useMemo(() =>
        collectionItems.map(item => ({ ...item, isFavorite: isFavorite(item.id) })),
        [collectionItems, isFavorite]
    );

    const displayItemsWithFavorites = useMemo(() =>
        displayItems.map(item => ({ ...item, isFavorite: isFavorite(item.id) })),
        [displayItems, isFavorite]
    );

    // Pull-to-refresh functionality
    const handleRefresh = async () => {
        // Force reload the page to refetch all data
        window.location.reload();
    };

    const { containerRef, isRefreshing, pullDistance } = usePullToRefresh(handleRefresh);

    return (
        <div
            ref={containerRef}
            className="bg-chop-bg-dark min-h-screen overflow-hidden pb-10"
            style={{ position: 'relative' }}
        >
            {/* Pull-to-Refresh Indicator */}
            {pullDistance > 0 && (
                <div
                    className="fixed top-0 left-0 right-0 flex justify-center items-center z-50 transition-all"
                    style={{
                        transform: `translateY(${pullDistance}px)`,
                        opacity: pullDistance / 60
                    }}
                >
                    <div className="bg-chop-bg-card backdrop-blur-xl border border-white/10 rounded-full p-3 shadow-xl">
                        <RefreshCw
                            size={20}
                            className={`text-chop-accent-cta ${isRefreshing || pullDistance > 60 ? 'animate-spin' : ''}`}
                        />
                    </div>
                </div>
            )}

            <HomeHeader
                user={profileData}
                location={locationName}
                onLocationChange={(newLoc, lat, lng) => handleLocationChange(newLoc, lat, lng)}
            />

            <IBSpotlight
                userName={profileData.username}
                userLocation={locationName} />

            <div className="px-6 max-w-lg mx-auto pt-2">
                <ViewAll />
            </div>
            <div className="p-2 max-w-lg mx-auto">
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

            {
                showMap ? (
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
                                    viewAllLink="/events"
                                    viewAllText="View All Events"
                                />
                                {eventsLoading && <Spinner size="lg" message="Loading Events..." />}
                                {!eventsLoading && eventItems.length === 0 && (
                                    <EmptyState
                                        icon={<Calendar size={64} />}
                                        title="No Hot Events This Week"
                                        description="Check out all upcoming events happening in Ibadan"
                                        ctaText="Explore All Events"
                                        ctaLink="/events"
                                    />
                                )}

                                <HorizontalScrollSection
                                    title="Popular In Ibadan"
                                    items={items}
                                    onItemClick={(item) => router.push(`/places/${item.id}`)}
                                    onFavoriteToggle={(item) => toggleFavorite({ id: item.id, type: "place" })}
                                    viewAllLink="/places"
                                    viewAllText="View All Places"
                                />
                                {popularLoading && <Spinner size="lg" message="Loading Popular Places" full />}
                                {!popularLoading && items.length === 0 && (
                                    <EmptyState
                                        icon={<Store size={64} />}
                                        title="No Popular Places Yet"
                                        description="Discover amazing restaurants, lounges, and activities in Ibadan"
                                        ctaText="Browse Places"
                                        ctaLink="/places"
                                    />
                                )}
                                {popularError && <div className="text-red-500 text-center p-4">Error loading popular places: {popularError}</div>}
                                {recommendedError && <div className="text-red-500 text-center p-4">Error loading recommended places: {recommendedError}</div>}
                                <div className="mb-4">

                                    <HorizontalScrollSection
                                        title={displayTitle}
                                        items={displayItemsWithFavorites}
                                        onItemClick={(i) => router.push(`/places/${i.id}`)}
                                        onFavoriteToggle={(item) => toggleFavorite({ id: item.id, type: "place" })}
                                        viewAllLink="/places"
                                        viewAllText="View All Restaurants"
                                    />
                                    {nearbyLoading && <p className="text-xs text-center text-gray-500">Finding closest spots...</p>}
                                    {!nearbyLoading && displayItemsWithFavorites.length === 0 && (
                                        <EmptyState
                                            icon={<MapPin size={64} />}
                                            title={coords.lat && coords.lng ? "No Places Found Nearby" : "Location Not Set"}
                                            description={
                                                coords.lat && coords.lng
                                                    ? "Try expanding your search radius or browse all places"
                                                    : "Enable location to discover places near you"
                                            }
                                            ctaText="Browse All Places"
                                            ctaLink="/places"
                                        />
                                    )}
                                </div>

                                <div>
                                    {recommendedItems.length > 0 && (
                                        <HorizontalScrollSection
                                            title="Because You Liked..."
                                            items={recommendedItems}
                                            onItemClick={(item) => router.push(`/places/${item.id}`)}
                                            onFavoriteToggle={(item) => toggleFavorite({ id: item.id, type: "place" })}
                                            viewAllText="View All Favorites"
                                            viewAllLink="/favorites"
                                        />
                                    )}
                                </div>
                            </>
                        )}
                    </>
                )
            }
        </div >
    );
}
