"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, MapPin, Calendar } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useFavorites } from "@/hooks/useFavorites";
import { motion } from "framer-motion";

type BrowseCardProps = {
    id: string | number;
    type: "place" | "event";
    title: string;
    subtitle?: string;
    imageUrl?: string;
    rating?: number;
    reviewCount?: number;
    category?: string;
    date?: string; // For events
    price?: string;
};

export default function BrowseCard({
    id,
    type,
    title,
    subtitle,
    imageUrl,
    rating,
    reviewCount,
    category,
    date,
    price,
}: BrowseCardProps) {
    const user = useSelector((state: RootState) => state.auth.user);
    const { isFavorite, toggleFavorite } = useFavorites(user?.id);

    const defaultImage = type === "place"
        ? "/assets/place-placeholder.jpg"
        : "/assets/event-placeholder.jpg";

    const handleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite({ id, type });
    };

    const isFav = isFavorite(id);
    const href = type === "place" ? `/places/${id}` : `/events/${id}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="break-inside-avoid mb-4 group relative"
        >
            <Link href={href} className="block">
                <div className="relative rounded-xl overflow-hidden bg-white/5 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                    {/* Image */}
                    <div className="relative w-full">
                        <Image
                            src={imageUrl || defaultImage}
                            alt={title}
                            width={500}
                            height={500}
                            className="w-full h-auto object-cover"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                        {/* Favorite Button */}
                        <button
                            onClick={handleFavorite}
                            className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors z-10"
                        >
                            <Heart
                                size={18}
                                className={`${isFav ? "fill-red-500 text-red-500" : "text-white"}`}
                            />
                        </button>

                        {/* Category Badge */}
                        {category && (
                            <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-xs text-white/90 font-medium">
                                {category}
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-3 space-y-1">
                        <div className="flex justify-between items-start gap-2">
                            <h3 className="font-bold text-white leading-tight group-hover:text-[var(--color-chop-accent-point)] transition-colors">
                                {title}
                            </h3>
                            {rating && (
                                <div className="flex items-center gap-1 shrink-0 bg-white/10 px-1.5 py-0.5 rounded text-xs">
                                    <Star size={10} className="fill-yellow-400 text-yellow-400" />
                                    <span className="text-white font-medium">{rating.toFixed(1)}</span>
                                </div>
                            )}
                        </div>

                        {subtitle && (
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                                <MapPin size={12} />
                                <span className="truncate">{subtitle}</span>
                            </div>
                        )}

                        {date && (
                            <div className="flex items-center gap-1 text-xs text-[var(--color-chop-accent-point)]">
                                <Calendar size={12} />
                                <span>{date}</span>
                            </div>
                        )}

                        {price && (
                            <div className="text-xs text-gray-300 font-medium pt-1">
                                {price}
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
