"use client";

import { useState } from "react";
import { X, Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { uploadEventImage } from "@/lib/supabase/uploadEventImage";

type GalleryUploadProps = {
    images: string[];
    onImagesChange: (images: string[]) => void;
    eventTitle: string;
};

export default function GalleryUpload({ images = [], onImagesChange, eventTitle }: GalleryUploadProps) {
    const [uploading, setUploading] = useState(false);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        if (!eventTitle) {
            alert("Please enter an event title first");
            return;
        }

        setUploading(true);
        try {
            const files = Array.from(e.target.files);
            const newUrls: string[] = [];

            for (const file of files) {
                // We'll use a specific prefix for gallery images if needed, 
                // but uploadEventImage puts them in 'thumbnails/' by default.
                // We might want to update uploadEventImage to accept a folder, 
                // but for now let's just use it as is.
                const url = await uploadEventImage(file, `${eventTitle}-gallery-${Date.now()}`);
                newUrls.push(url);
            }

            onImagesChange([...images, ...newUrls]);
        } catch (error) {
            console.error("Error uploading gallery images:", error);
            alert("Failed to upload some images");
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index: number) => {
        onImagesChange(images.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="text-sm text-gray-400">Gallery Images</label>
                <span className="text-xs text-gray-500">{images.length} images</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {images.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden group bg-white/5 border border-white/10">
                        <Image
                            src={url}
                            alt={`Gallery ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}

                {/* Upload Button */}
                <label className="relative aspect-square rounded-lg border-2 border-dashed border-white/10 hover:border-chop-accent-cta/50 hover:bg-white/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileSelect}
                        disabled={uploading}
                        className="hidden"
                    />
                    {uploading ? (
                        <Loader2 className="w-6 h-6 text-chop-accent-cta animate-spin" />
                    ) : (
                        <>
                            <Upload className="w-6 h-6 text-gray-400 group-hover:text-chop-accent-cta transition-colors" />
                            <span className="text-xs text-gray-500 group-hover:text-gray-300">Add Photos</span>
                        </>
                    )}
                </label>
            </div>
        </div>
    );
}
