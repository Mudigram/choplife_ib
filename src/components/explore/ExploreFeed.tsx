"use client";

import { MapItem } from "@/types/map";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, MapPin, Calendar, Star } from "lucide-react";

type Props = {
    items: MapItem[];
};

export default function ExploreFeed({ items }: Props) {
    const router = useRouter();

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-chop-text-light">No results found</h3>
                <p className="text-chop-text-subtle mt-2">Try adjusting your filters or search area.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 pb-24 pt-4">
            {items.map((item) => (
                <div
                    key={`${item.type}-${item.id}`}
                    onClick={() => {
                        if (item.type === 'place') {
                            router.push(`/places/${item.id}`);
                        } else {
                            router.push(`/events/${item.slug || item.id}`);
                        }
                    }}
                    className="group relative bg-chop-bg-card/40 border border-chop-text-subtle/10 rounded-2xl overflow-hidden cursor-pointer hover:border-chop-accent-cta/50 transition-all duration-300"
                >
                    {/* Image */}
                    <div className="relative h-48 w-full overflow-hidden">
                        {item.image_url ? (
                            <Image
                                src={item.image_url}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600">
                                No Image
                            </div>
                        )}

                        {/* Type Badge */}
                        <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
                            {item.type}
                        </div>

                        {/* Favorite Button (Mock) */}
                        <button className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-red-500/20 hover:text-red-500 transition-colors">
                            <Heart size={16} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-lg text-chop-text-light line-clamp-1">{item.title}</h3>
                            {item.rating && (
                                <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold bg-yellow-500/10 px-1.5 py-0.5 rounded">
                                    <Star size={10} fill="currentColor" />
                                    {item.rating}
                                </div>
                            )}
                        </div>

                        <p className="text-sm text-chop-text-subtle line-clamp-2 mb-3 h-10">
                            {item.description || item.subtitle || "No description available."}
                        </p>

                        <div className="flex items-center justify-between text-xs text-chop-text-muted mt-auto">
                            {item.type === 'event' && item.date ? (
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={12} className="text-chop-accent-cta" />
                                    <span>{item.date}</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={12} className="text-chop-accent-cta" />
                                    <span>Ibadan</span>
                                </div>
                            )}

                            {item.price && (
                                <div className="font-medium text-chop-text-light bg-chop-bg-dark px-2 py-1 rounded-md">
                                    {typeof item.price === 'number' ? `₦${item.price}` : item.price}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
