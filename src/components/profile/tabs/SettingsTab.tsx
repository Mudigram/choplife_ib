"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { LogOut, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import AvatarUploader from "../AvatarUploader";
type SettingsTabProps = {
    user: {
        id: string;
        full_name?: string;
        username?: string;
        bio?: string;
        tags?: string[];
        social_handles?: Record<string, string>;
    };
};

export default function SettingsTab({ user }: SettingsTabProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        full_name: user.full_name || "",
        username: user.username || "",
        bio: user.bio || "",
        tags: (user.tags || []).join(", "),
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 🔹 Update profile data in Supabase
    const handleSave = async () => {
        setLoading(true);

        const updates = {
            full_name: formData.full_name.trim(),
            username: formData.username.trim(),
            bio: formData.bio.trim(),
            tags: formData.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
        };

        const { error } = await supabase.from("users").update(updates).eq("id", user.id);

        setLoading(false);
        if (error) alert("Error updating profile: " + error.message);
        else alert("Profile updated successfully!");
    };

    // 🔹 Logout
    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <div className="p-5 text-white space-y-5">
            <h2 className="text-lg font-semibold mb-4">Account Settings</h2>

            <div>
                <AvatarUploader />
            </div>

            {/* Full Name */}
            <div>
                <label className="text-sm text-gray-400">Full Name</label>
                <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
            </div>


            {/* Username */}
            <div>
                <label className="text-sm text-gray-400">Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
            </div>

            {/* Bio */}
            <div>
                <label className="text-sm text-gray-400">Bio</label>
                <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
            </div>

            {/* Tags */}
            <div>
                <label className="text-sm text-gray-400">Interests / Tags</label>
                <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="e.g. food, culture, nightlife"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
            </div>

            {/* Save Button */}
            <button
                onClick={handleSave}
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg py-2 flex items-center justify-center gap-2 transition"
            >
                <Save size={18} />
                {loading ? "Saving..." : "Save Changes"}
            </button>

            {/* Logout */}
            <button
                onClick={handleLogout}
                className="w-full cursor-pointer bg-chop-accent-error/70 hover:bg-chop-accent-error/30 font-semibold rounded-lg py-2 flex items-center justify-center gap-2 transition"
            >
                <LogOut size={18} />
                Log Out
            </button>
        </div>
    );
}
