import { TopPlace } from "@/hooks/admin/useAdminAnalytics";
import { Star, MapPin } from "lucide-react";
import Image from "next/image";

type TopPlacesListProps = {
    places: TopPlace[];
};

export default function TopPlacesList({ places }: TopPlacesListProps) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Top Rated Places</h3>
            <div className="space-y-4">
                {places.map((place, index) => (
                    <div key={place.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center font-bold text-gray-500 bg-white/5 rounded-full">
                            #{index + 1}
                        </div>
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                            {place.image_url ? (
                                <Image
                                    src={place.image_url}
                                    alt={place.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500">
                                    <MapPin size={20} />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-white font-medium truncate group-hover:text-chop-accent-cta transition-colors">
                                {place.name}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <span className="flex items-center gap-1 text-yellow-400">
                                    <Star size={12} fill="currentColor" />
                                    {place.rating.toFixed(1)}
                                </span>
                                <span>•</span>
                                <span>{place.review_count} reviews</span>
                            </div>
                        </div>
                    </div>
                ))}
                {places.length === 0 && (
                    <div className="text-center text-gray-500 py-8">No data available</div>
                )}
            </div>
        </div>
    );
}
