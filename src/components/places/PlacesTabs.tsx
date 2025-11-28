"use client";

import { useState } from "react";
import GallerySection from "./tabs/GallerySection/GallerySection";
import AboutTab from "./tabs/About";
import ReviewsTab from "./tabs/Review";
import MenuTab from "./tabs/MenuTab";

import type { Place } from "@/types/place";
import { useGallery } from "@/hooks/useGallery";


const tabs = ["Menu", "Reviews", "About", "Gallery"];


export default function PlaceTabs({
    placeId,
    place
}: {
    placeId: string;
    place: Place;
}) {
    const [active, setActive] = useState(0);
    const { gallery, loading: galleryLoading } = useGallery(placeId);

    return (
        <div className="sticky relative w-full max-w-lg mx-auto mt-4 px-2 z-30">
            {/* Glass Bar */}
            <div
                className="
          backdrop-blur-2xl bg-white/10 border border-white/20
          rounded-xl shadow-lg flex items-center justify-between
          px-4 py-3 relative sticky top-0 z-70
        "
            >
                {tabs.map((tab, index) => (
                    <button
                        key={tab}
                        onClick={() => setActive(index)}
                        className={`
              relative px-2 py-1 text-sm transition-all duration-300
              ${active === index
                                ? "text-white font-semibold"
                                : "text-white/60 hover:text-white"
                            }
            `}
                    >
                        {tab}
                    </button>
                ))}

                {/* Sliding neon indicator */}
                <div
                    className="
            absolute bottom-0 h-[3px] rounded-full
            bg-[var(--color-chop-accent-point)]
            shadow-[0_0_10px_rgba(255,215,0,0.7)]
            transition-all duration-300 ease-out
          "
                    style={{
                        width: `${100 / tabs.length}%`,
                        left: `${(100 / tabs.length) * active}%`,
                    }}
                />
            </div>

            {/* CONTENT AREA */}
            <div className="mt-6">
                {active === 0 && <MenuTab placeId={placeId} />}
                {active === 1 && (
                    <ReviewsTab
                        placeId={placeId}
                        avgRating={place.average_rating}
                        totalReviews={place.total_reviews}
                        placeName={place.name}
                    />
                )}
                {active === 2 && <AboutTab place={place} />}
                {active === 3 &&
                    (galleryLoading ? (
                        <div className="text-white text-center py-8">Loading...</div>
                    ) : (
                        <GallerySection gallery={gallery} />
                    ))}
            </div>
        </div>
    );
}

