// src/components/home/HorizontalScrollSection.tsx
"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Heart, ChevronRight } from "lucide-react";

export type ScrollItem = {
    id: string | number;
    title: string;
    image_url?: string | null;
    subtitle?: string | null;
    description?: string | null;
    rating?: number | null;
    price_rating?: string | null;
    lat?: number | null;
    lng?: number | null;
    isFavorite?: boolean;
    favorites_count?: number;
};

type Props = {
    title: string;
    items: ScrollItem[];
    onItemClick?: (item: ScrollItem) => void;
    onFavoriteToggle?: (item: ScrollItem) => void;
    viewAllLink?: string;
    viewAllText?: string;
};

const FALLBACK_BG = "/events/restview3.jpg"; // add a local image to public/

export default function HorizontalScrollSection({ title, items, onItemClick, onFavoriteToggle, viewAllLink, viewAllText }: Props) {
    return (
        <section className="px-4 mb-8">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-white">{title}</h2>
                {viewAllLink && (
                    <Link
                        href={viewAllLink}
                        className="flex items-center gap-1 text-sm text-chop-accent-cta hover:text-chop-accent-cta/80 transition-colors"
                    >
                        <span>{viewAllText}</span>
                        <ChevronRight size={16} />
                    </Link>
                )}
            </div>

            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="min-w-[260px] rounded-xl bg-white/5 border border-white/6 shadow-sm overflow-hidden cursor-pointer"
                        onClick={() => onItemClick?.(item)}
                        role="button"
                        aria-label={String(item.title)}
                    >
                        <div className="relative w-full h-28 bg-zinc-800/40">
                            {/* Favorite Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFavoriteToggle?.(item);
                                }}
                                className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
                            >
                                <Heart
                                    size={14}
                                    className={item.isFavorite ? "fill-red-500 text-red-500" : "text-white"}
                                />
                            </button>
                            {item.image_url ? (
                                // only render next/image when src is valid string
                                <Image
                                    src={item.image_url}
                                    alt={item.title || "image"}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 260px, (max-width: 1024px) 240px, 200px"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800/60 to-zinc-900/60">
                                    {/* local fallback - faster and avoids next/image error */}
                                    <Image
                                        src={FALLBACK_BG}
                                        alt="placeholder"
                                        width={260}
                                        height={160}
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            {item.favorites_count && item.favorites_count > 0 && (
                                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
                                    <p className="text-xs text-gray-300">
                                        {item.favorites_count} {item.favorites_count === 1 ? 'save' : 'saves'}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="p-2">
                            <p className="text-sm font-medium text-white line-clamp-1">{item.title}</p>
                            {item.description && <p className="text-[11px] text-gray-400 line-clamp-1">{item.description}</p>}
                            {item.rating !== undefined && item.rating !== null && (
                                <p className="text-[12px] mt-1 text-[var(--color-chop-accent-point)] flex items-center">⭐ {Number(item.rating).toFixed(1)}  <span className="text-[16px] text-chop-accent-status ml-2">
                                    {item.price_rating || "₦₦"}
                                </span></p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
