"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEventGallery } from "@/hooks/useEventGallery";

type EventGalleryTabProps = {
    eventId: string | number;
};

export default function EventGalleryTab({ eventId }: EventGalleryTabProps) {
    const { gallery, loading, error } = useEventGallery(eventId);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-chop-accent-point" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-center text-red-400">
                Failed to load gallery
            </div>
        );
    }

    if (gallery.length === 0) {
        return (
            <div className="p-12 text-center text-gray-400">
                <p>No photos available for this event yet.</p>
            </div>
        );
    }

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);
    const nextImage = () => setLightboxIndex((prev) => (prev! + 1) % gallery.length);
    const prevImage = () => setLightboxIndex((prev) => (prev! - 1 + gallery.length) % gallery.length);

    return (
        <div className="w-full max-w-lg mx-auto p-4">
            {/* Masonry Grid */}
            <div className="grid grid-cols-2 gap-3">
                {gallery.map((image, index) => (
                    <motion.div
                        key={image.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={`relative overflow-hidden rounded-2xl cursor-pointer group ${index % 3 === 0 ? "col-span-2 h-64" : "h-48"
                            }`}
                        onClick={() => openLightbox(index)}
                    >
                        <Image
                            src={image.image_url}
                            alt={image.caption || "Event photo"}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            {image.caption && (
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <p className="text-white text-sm">{image.caption}</p>
                                </div>
                            )}
                        </div>
                        {/* Type Badge */}
                        <div className="absolute top-2 right-2">
                            <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                                {image.type.replace("_", " ")}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>

                        {/* Navigation Buttons */}
                        {gallery.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
                                >
                                    <ChevronLeft className="w-6 h-6 text-white" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
                                >
                                    <ChevronRight className="w-6 h-6 text-white" />
                                </button>
                            </>
                        )}

                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative w-full h-full max-w-4xl max-h-[80vh] mx-4"
                        >
                            <Image
                                src={gallery[lightboxIndex].image_url}
                                alt={gallery[lightboxIndex].caption || "Event photo"}
                                fill
                                className="object-contain"
                            />
                        </motion.div>

                        {/* Caption */}
                        {gallery[lightboxIndex].caption && (
                            <div className="absolute bottom-4 left-4 right-4 text-center">
                                <p className="text-white bg-black/50 backdrop-blur-sm rounded-xl px-4 py-2 mx-auto max-w-2xl">
                                    {gallery[lightboxIndex].caption}
                                </p>
                            </div>
                        )}

                        {/* Counter */}
                        <div className="absolute top-4 left-4 text-white text-sm bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                            {lightboxIndex + 1} / {gallery.length}
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
