"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import useMenuItems from "@/hooks/useMenuItems";
import { useState } from "react";

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Drinks", "Popular"];

export default function MenuTab({ placeId }: { placeId: string }) {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const { items, loading } = useMenuItems(placeId, selectedCategory);

    return (
        <div className="w-full">
            {/* CATEGORY BAR */}
            <div className="flex sticky z-10 top-12  gap-2 overflow-x-auto px-4 py-3 scrollbar-none">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm whitespace-nowrap  
              ${selectedCategory === cat
                                ? "bg-white/6 border border-white/10 text-white"
                                : "text-gray-300"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* EMPTY STATE */}
            {!loading && items.length === 0 && (
                <p className="text-center text-gray-500 py-10">
                    No menu available for this place.
                </p>
            )}

            {/* MASONRY GRID */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="columns-2 gap-2 px-4 pb-6"
            >
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="mb-2 break-inside-avoid cursor-pointer group"
                        onClick={() => {
                            if (item.website_url) window.open(item.website_url, "_blank");
                        }}
                    >
                        {item.photo_url && (
                            <Image
                                src={item.photo_url}
                                width={800}
                                height={1200}
                                alt={item.name}
                                className="rounded-t-xl object-cover w-full transition transform group-hover:scale-105"
                            />
                        )}

                        <div className="px-2 py-2 rounded-b-xl bg-white/5 border border-white/10 backdrop-blur-md">
                            <h3 className="font-medium text-sm text-white">{item.name}</h3>

                            {item.price && (
                                <p className="text-gray-50 text-xs">{item.price}</p>
                            )}

                            {item.description && (
                                <p className="text-gray-50 text-xs mt-1 line-clamp-2">
                                    {item.description}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
