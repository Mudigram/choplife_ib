"use client";

import { useState } from "react";
import { Camera, X } from "lucide-react";
import Image from "next/image";

type ImageUploadProps = {
    currentImage?: string | null;
    onImageSelect: (file: File) => void;
    label?: string;
};

export default function ImageUpload({ currentImage, onImageSelect, label = "Upload Image" }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(currentImage || null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            onImageSelect(file);
        }
    };

    const clearImage = (e: React.MouseEvent) => {
        e.preventDefault();
        setPreview(null);
        // We can't easily "unselect" a file for the parent without a specific handler,
        // but for now this just clears the preview.
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">{label}</label>
            <div className="relative w-full h-48 bg-white/5 border-2 border-dashed border-white/10 rounded-xl hover:border-chop-accent-cta/50 transition-colors group">
                {preview ? (
                    <>
                        <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-cover rounded-xl"
                        />
                        <button
                            onClick={clearImage}
                            className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-red-500 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 group-hover:text-chop-accent-cta transition-colors">
                        <Camera size={32} className="mb-2" />
                        <span className="text-sm">Click to upload</span>
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
        </div>
    );
}
