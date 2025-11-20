"use client";

import Image from "next/image";
import { X } from "lucide-react";

export default function GalleryPreviewModal({ items, index, onClose }: any) {
    if (index === null) return null;

    return (
        <div
            className="
        fixed inset-0 z-[999] flex items-center justify-center 
        bg-black/40 backdrop-blur-2xl
        animate-fadeIn
      "
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                className="
          absolute top-6 right-6 p-3 rounded-full 
          bg-[var(--color-chop-accent-point)] 
          shadow-[0_0_12px_rgba(255,215,0,0.7)]
        "
            >
                <X size={22} className="text-black font-bold" />
            </button>

            {/* Swipe Container */}
            <div
                className="
          w-full h-full overflow-x-auto whitespace-nowrap 
          scroll-smooth snap-x snap-mandatory
        "
                onClick={(e) => e.stopPropagation()}
            >
                {items.map((item: any, i: number) => (
                    <div
                        key={item.id}
                        className="
              inline-flex items-center justify-center 
              w-full h-full snap-center
            "
                    >
                        {item.file_type === "image" ? (
                            <Image
                                src={item.file_url}
                                alt="preview"
                                width={item.width}
                                height={item.height}
                                className="
                  max-h-[90vh] max-w-[90vw] rounded-xl 
                  shadow-lg object-contain animate-zoomIn
                "
                            />
                        ) : (
                            <video
                                src={item.file_url}
                                controls
                                className="
                  max-h-[90vh] max-w-[90vw] rounded-xl shadow-lg
                "
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
