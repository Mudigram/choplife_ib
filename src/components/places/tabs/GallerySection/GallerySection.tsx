// /components/places/GallerySection.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import type { GalleryItem } from "@/types/gallery";
import GalleryPreviewModal from "./MediaModal";
import { motion } from "framer-motion";


type GalleryProps = {
    gallery: GalleryItem[];
};


export default function GallerySection({ gallery }: GalleryProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);


    if (!gallery || gallery.length === 0) {
        return <div className="text-gray-400 py-6 text-center">No media yet</div>;
    }


    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 3, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }} className="columns-2 gap-2 px-4 pb-6">
            {gallery.map((gallery, index) => (
                <div key={gallery.id} className="mb-2 break-inside-avoid cursor-pointer group">
                    {gallery.file_type === "image" ? (
                        <Image
                            src={gallery.file_url}
                            width={gallery.width ?? 800}
                            height={gallery.height ?? 1200}
                            alt="gallery"
                            onClick={() => setActiveIndex(index)}
                            className="rounded-xl object-cover w-full transition transform group-hover:scale-105"
                        />
                    ) : (
                        <video
                            src={gallery.file_url}
                            controls
                            className="rounded-xl w-full"
                        />
                    )}
                </div>
            ))}

            <GalleryPreviewModal
                items={gallery}
                index={activeIndex}
                onClose={() => setActiveIndex(null)}
            />

        </motion.div>
    );
}
