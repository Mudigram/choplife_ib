import { BadgeCheck, Star, MapPin, Clock4 } from "lucide-react";
import type { Place } from "@/types/place";

type Props = {
    place: Partial<Place>;
};
export default function InfoSection({ place }: Props) {
    return (
        <section
            className="
                    p-4  mt-[-10px] rounded-2xl 
                    backdrop-blur-sm bg-white/5 
                    border border-white/10 
                    shadow-lg relative w-full max-w-lg mx-auto max-w-lg
                "
        >
            {/* VERIFIED + STATS */}
            <div className="flex items-center justify-between">

                {/* Verified Badge */}
                <div className="flex items-center gap-1">
                    {place.is_featured && (
                        <span className="
                                flex items-center gap-1 text-sm font-medium
                                text-[var(--color-chop-accent-status)]
                                drop-shadow-[var(--shadow-neon-status)]
                            ">
                            <BadgeCheck size={16} />
                            Verified
                        </span>
                    )}
                </div>

                {/* Rating */}
                <div
                    className="
                            flex items-center gap-1 px-2 py-1 rounded-full text-sm
                            bg-white/5 border border-white/10 
                            backdrop-blur-md
                        "
                >
                    <Star size={16} className="text-[var(--color-chop-accent-point)]" />
                    <span className="font-semibold">{place.average_rating ?? 0}</span>
                    <span className="text-xs text-gray-300">
                        ({place.total_reviews ?? 0})
                    </span>
                </div>
            </div>

            {/* NAME */}
            <h2 className="text-xl font-bold text-chop-text-light mt-2">
                {place.name}
            </h2>

            {/* OPEN TIME • PRICE • CUISINE */}
            <div className="flex items-center gap-2 text-sm text-gray-300 mt-1">

                {/* Time */}
                <span className="flex items-center gap-1">
                    <Clock4 size={14} />
                    {place.open_time ?? "N/A"}
                </span>

                <span>•</span>

                {/* Price */}
                <span
                    className="
                            px-2 py-0.5 rounded-full text-xs font-semibold
                            bg-white/5 border border-white/10 backdrop-blur-sm
                            text-[var(--color-chop-accent-point)]
                        "
                >
                    {place.pricing_category ?? "#"}
                </span>

                <span>•</span>

                <span className="capitalize">
                    {place.cuisine_type ?? "Restaurant"}
                </span>
            </div>

            {/* ADDRESS */}
            <div className="flex items-center gap-1 text-sm mt-3 text-chop-text-light">
                <MapPin
                    size={16}
                    className="text-[var(--color-chop-accent-cta)] drop-shadow-[var(--shadow-neon-cta)]"
                />
                <span>{place.address}</span>
            </div>
        </section>
    )
}

