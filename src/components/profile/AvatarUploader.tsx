"use client";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { uploadAvatar } from "@/lib/supabase/uploadAvatars";
import { updateAvatarUrl } from "@/redux/slices/userSlice";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useAppSelector } from "@/redux/store";

export default function AvatarUploader() {
    const dispatch = useDispatch();
    const user = useAppSelector((state) => state.user.user);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = event.target.files?.[0];
            if (!file || !user) return;

            setUploading(true);
            const url = await uploadAvatar(user.id, file);

            dispatch(updateAvatarUrl(url));
        } catch (error) {
            console.error("Error uploading avatar:", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-3">
            <div className="relative">
                <Image
                    src={user?.avatar_url || "/assets/default-avatar.png"}
                    width={40}
                    height={40}
                    className="w-24 h-24 rounded-full object-cover border border-gray-700"
                    alt="Avatar"
                />
                <label
                    htmlFor="avatar-upload"
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 rounded-full cursor-pointer transition"
                >
                    <Camera className="text-white" />
                    <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>
            </div>

            <button
                disabled={uploading}
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-sm disabled:opacity-60"
            >
                {uploading ? "Uploading..." : "Change Avatar"}
            </button>
        </div>
    );
}
